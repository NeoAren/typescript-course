// AUTOBIND DECORATOR

export const autobind = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
   const originalMethod = descriptor.value;
   return {
      configurable: true,
      get() {
         return originalMethod.bind(this);
      }
   };
}
