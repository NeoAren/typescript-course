// TypeScript Advanced: Decorators

// Decorators 1 - class decorator

type ConstructorType = {
   new(...args: any[]): { name: string }
};

const Logger = (message: string) => {
   console.log('Logger() - Factory executed');
   return function<T extends ConstructorType>(originalConstructor: T) {
      console.log('Logger() - Decorator executed');
      return class extends originalConstructor {
         constructor(..._args: any[]) {
            super();
            console.log('Logger() - ' + message);
         }
      }
   }
};

@Logger('New constructor')
class Person {
   public name: string = 'Amos Burton';
   constructor() {
      console.log('Original constructor');
   }
}

const testperson = new Person();
console.log(testperson); // { name: 'Amos Burton' }

// Decorators 2 - property, accessor, method and parameter decorators

const groupLog = (title: string, ...args: unknown[]) => {
   console.group(title);
   args.forEach(arg => console.log(arg));
   console.groupEnd();
};

const PropertyLogger = (target: any, propertyName: string) => {
   groupLog('Property decorator!', target, propertyName);
};

const AccessorLogger = (target: any, name: string, descriptor: PropertyDescriptor) => {
   groupLog('Accessor decorator!', target, name, descriptor);
};

const MethodLogger = (target: any, name: string, descriptor: PropertyDescriptor) => {
   groupLog('Method decorator!', target, name, descriptor);
};

const ParameterLogger = (target: any, name: string, position: number) => {
   groupLog('Parameter decorator!', target, name, position);
};

class Product {

   @PropertyLogger
   title: string;
   private _price: number;

   constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
   }

   @AccessorLogger
   set price(val: number) {
      if (val > 0) {
         this._price = val;
      } else {
         throw new  Error('Invalid price.');
      }
   }

   @MethodLogger
   getPriceWithTax(@ParameterLogger tax: number) {
      return this._price * (1 + tax);
   }
}

const testproduct = new Product('Book', 19);
console.log(testproduct.getPriceWithTax(0.27)); // 24.13
console.log(testproduct); // {title: 'Book', _price: 19}

// Decorators 3 - autobind 'this' to method

function Autobind(_target: any, _name: string, descriptor: PropertyDescriptor) {
   const originalMethod = descriptor.value;
   const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
         return originalMethod.bind(this);
      }
   };
   return adjDescriptor;
}

class MessagePrinter {

   private message: string = 'This works!';

   @Autobind
   boundShowMessage() {
      console.log(this.message);
   }

   unboundShowMessage() {
      console.log(this.message);
   }

}

const p = new MessagePrinter();
const button = document.querySelector('#print-message')!;
button.addEventListener('click', p.boundShowMessage);    // 'This workds!'
button.addEventListener('click', p.unboundShowMessage);  // undefined

// Decorators 4 - validating class properties

interface ValidatorConfig {
   [property: string]: {
      [validatableProp: string]: string[] // { SomeClass: { someProperty: [ 'required', 'positive' ] } }
   }
}

const registeredValidators: ValidatorConfig = {};

const Required = (target: any, propName: string) => {
   registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [ ...(registeredValidators[target.constructor.name]?.[propName] || []), 'required' ]
   };
};

const PositiveNumber = (target: any, propName: string) => {
   registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [ ...(registeredValidators[target.constructor.name]?.[propName] || []), 'positive' ]
   };
};

const validate = (obj: any) => {
   const objValidatorConfig = registeredValidators[obj.constructor.name];
   if (!objValidatorConfig) return true;
   let isValid = true;
   for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
         switch (validator) {
            case 'required': {
               isValid = isValid && !!obj[prop];
               break;
            }
            case 'positive': {
               isValid = isValid && obj[prop] > 0;
               break;
            }
         }
      }
   }
   return isValid;
};

class Course {

   @Required
   title: string;
   @PositiveNumber
   price: number;

   constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
   }

}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
   event.preventDefault();
   const titleEl = document.querySelector('#title') as HTMLInputElement;
   const priceEl = document.querySelector('#price') as HTMLInputElement;
   const createdCourse = new Course(titleEl.value, +priceEl.value);
   if (!validate(createdCourse)) {
      return alert('Invalid input.');
   }
   console.log(createdCourse); // { title: '...', price: ... }
});
