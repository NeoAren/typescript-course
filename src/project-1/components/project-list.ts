// PROJECT LIST COMPONENT

import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { autobind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project';
import { DragTarget } from '../models/drag-drop';
import { projectState } from '../state/project-state';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

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
