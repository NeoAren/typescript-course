// PROJECT ITEM COMPONENT

import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
