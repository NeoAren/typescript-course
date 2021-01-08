// PROJECT STATE

import { Project, ProjectStatus } from '../models/project';

type Listener<T> = (items: T[]) => void;

class State<T> {
   protected listeners: Listener<T>[] = [];

   addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
   }
}

export class ProjectState extends State<Project> {

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

export const projectState = ProjectState.getInstance();
