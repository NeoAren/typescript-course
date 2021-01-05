// TypeScript Basics: Union and Literal Types

// Union types: string | number
// Literal types: 'value' or 123
// Combined: 'value' | 123

const deposit = (amount: number, currency: 'MCR$' | 'UN$') => {
   if (currency === 'MCR$') {
      console.log(`You deposited ${amount} MCR$.`);
   } else {
      console.log(`You deposited ${amount} UN$.`);
   }
};

// deposit(1000, 'US$'); // Invalid argument

deposit(1000, 'UN$');

deposit(1400, 'MCR$');
