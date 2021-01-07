// Project App

// AUTOBIND DECORATOR

const autobind = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
   const originalMethod = descriptor.value;
   return {
      configurable: true,
      get() {
         return originalMethod.bind(this);
      }
   };
}

// VALIDATION

interface Validatable {
   value: string | number;
   required?: boolean;
   minLength?: number;
   maxLength?: number;
   min?: number;
   max?: number;
}

const validateInput = ({ value, required, minLength, maxLength, min, max }: Validatable) => {
   let isValid = true;
   if (required) {
      if (typeof value === 'string') isValid = isValid && value !== '';
      if (typeof value === 'number') isValid = isValid && !Number.isNaN(value);
   }
   if (typeof value === 'string' && minLength != null) {
      isValid = isValid && value.length >= minLength;
   }
   if (typeof value === 'string' && maxLength != null) {
      isValid = isValid && value.length <= maxLength;
   }
   if (typeof value === 'number' && min != null) {
      isValid = isValid && value >= min;
   }
   if (typeof value === 'number' && max != null) {
      isValid = isValid && value <= max;
   }
   return isValid;
};

// DRAG & DROP

interface Draggable {
   dragStartHandler(event: DragEvent): void;
   dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
   dragOverHandler(event: DragEvent): void;
   dropHandler(event: DragEvent): void;
   dragLeaveHandler(event: DragEvent): void;
}

// PROJECT

enum ProjectStatus { Active, Finished }

class Project {

   public id: string;
   public title: string;
   public description: string;
   public people: number;
   public status: ProjectStatus;

   constructor(id: string, title: string, description: string, people: number, status: ProjectStatus) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.people = people;
      this.status = status;
   }

}

// PROJECT STATE

type Listener<T> = (items: T[]) => void;

class State<T> {
   protected listeners: Listener<T>[] = [];

   addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
   }
}

class ProjectState extends State<Project> {

   private projects: Project[] = [];
   private static instance: ProjectState;

   private constructor() {
      super();
   }

   addProject(title: string, description: string, people: number) {
      const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
      this.projects.push(newProject);
      this.listeners.forEach(listener => listener(this.projects.slice()));
   }

   moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(p => p.id === projectId);
      if (project && project.status !== newStatus) {
         project.status = newStatus;
         this.updateListeners();
      }
   }

   private updateListeners() {
      this.listeners.forEach(listener => listener(this.projects.slice()));
   }

   static getInstance() {
      if (!this.instance) {
         this.instance = new ProjectState();
      }
      return this.instance;
   }

}

const projectState = ProjectState.getInstance();

// PROJECT COMPONENTS

abstract class Component<T extends HTMLElement, U extends HTMLElement> {

   public templateElement: HTMLTemplateElement;
   public hostElement: T;
   public element: U;

   protected constructor(templateId: string, hostId: string, insertAtStart: boolean, newElementId?: string) {
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostId)! as T;

      const importedNode = document.importNode(this.templateElement.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElementId) this.element.id = newElementId;

      this.attach(insertAtStart);
   }

   private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
   }

   abstract configure(): void;
   abstract renderContent(): void;

}

// PROJECT ITEM

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
   private project: Project;

   constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
   }

   get persons() {
      if (this.project.people === 1) return '1 person';
      return this.project.people + ' persons';
   }

   configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
   }

   renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
   }

   @autobind
   dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
   }

   @autobind
   dragEndHandler(_event: DragEvent) {
      console.log('DragEnd')
   }

}

// PROJECT LIST

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

   public assignedProjects: Project[];

   constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];
      this.configure();
      this.renderContent();
   }

   configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);
      projectState.addListener((projects: Project[]) => {
         this.assignedProjects = projects.filter(p => {
            if (this.type === 'active') return p.status === ProjectStatus.Active;
            return p.status === ProjectStatus.Finished;
         });
         this.renderProjects();
      });
   }

   renderContent() {
      this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
   }

   @autobind
   dragOverHandler(event: DragEvent) {
      if (event.dataTransfer?.types[0] === 'text/plain') {
         event.preventDefault();
         const listEl = this.element.querySelector('ul')!;
         listEl.classList.add('droppable');
      }
   }

   @autobind
   dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData('text/plain');
      const newStatus = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
      projectState.moveProject(projectId, newStatus);

   }

   @autobind
   dragLeaveHandler(_event: DragEvent) {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
   }

   private renderProjects() {
      const listEl = document.querySelector(`#${this.type}-projects-list`)! as HTMLUListElement;
      listEl.innerHTML = '';
      for (const projectItem of this.assignedProjects) {
         new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
      }
   }

}

// PROJECT INPUT

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

   public titleInputElement: HTMLInputElement;
   public descInputElement: HTMLInputElement;
   public peopleInputElement: HTMLInputElement;

   constructor() {
      super('project-input', 'app', true, 'user-input');
      this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
      this.descInputElement = this.element.querySelector('#description')! as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
      this.configure();
      this.renderContent();
   }

   configure() {
      this.element.addEventListener('submit', this.submitHandler);
   }

   renderContent() {}

   private gatherUserInput(): [string, string, number] | void {
      const title = this.titleInputElement.value;
      const desc = this.descInputElement.value;
      const people = +this.peopleInputElement.value;
      const titleValidatable: Validatable = { value: title, required: true };
      const descValidatable: Validatable = { value: desc, required: true, minLength: 5 };
      const peopleValidatable: Validatable = { value: people, required: true, min: 1, max: 10 };
      if (!validateInput(titleValidatable) || !validateInput(descValidatable) || !validateInput(peopleValidatable)) {
         alert('Invalid input, please try again.');
      } else {
         return [title, desc, people];
      }
   }

   private clearInputs() {
      this.titleInputElement.value = '';
      this.descInputElement.value = '';
      this.peopleInputElement.value = '';
   }

   @autobind
   private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
         const [title, desc, people] = userInput;
         projectState.addProject(title, desc, people);
         this.clearInputs();
      }
   }

}

// RENDER

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
