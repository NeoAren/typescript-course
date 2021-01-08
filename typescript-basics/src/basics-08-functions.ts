// TypeScript Basics: Functions

// void: the function returns nothing
// never: the function never returns

const fire = (weapon: 'PDC' | 'Torpedo' | 'Railgun', cb: (error: string) => void): void => {
   switch (weapon) {
      case 'PDC': {
         console.log('PDC network open.');
         break;
      }
      case 'Torpedo': {
         console.log('Torpedoes away.');
         break;
      }
      case 'Railgun': {
         cb('Railgun malfunction.');
         break;
      }
   }
};

const error = (message: string): never => {
   throw new Error(message);
};

fire('PDC', err => error(err));
fire('Torpedo', err => error(err));
fire('Railgun', err => error(err));
