// PROJECT INPUT COMPONENT

import { Component } from './base-component';
import { autobind } from '../decorators/autobind';
import { validateInput, Validatable } from '../util/validation';
import { projectState } from '../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

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
