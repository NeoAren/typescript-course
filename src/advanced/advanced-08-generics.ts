// TypeScript Advanced: Generic types

// Generic functions

const merge = <T, U>(objA: T, objB: U) => {
   return Object.assign(objA, objB);
}

// console.log(merge({ ship: 'Arboghast' }, 13)); // Cannot assign 13 to object, but no error is thrown
console.log(merge({ ship: 'Arboghast' }, { navy: 'UNN' })); // { ship: 'Arboghast', navy: 'UNN' }

// Generic functions - extends constraint

interface Lengthy {
   length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
   let text = 'Got no value.';
   if (element.length === 1) text = 'Got 1 element.';
   if (element.length > 0) text = 'Got ' + element.length + ' elements.';
   return [element, text];
};

// console.log(countAndDescribe(45)); // Invalid argument, has no length parameter
console.log(countAndDescribe('Lorem ipsum'));      // [ 'Lorem ipsum', 'Got 11 elements.' ]
console.log(countAndDescribe(['lorem', 'ipsum'])); // [ [ 'Lorem', 'ipsum' ], 'Got 2 elements.' ]

// Generic functions - keyof constraint

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
   return obj[key];
};

// console.log(extractAndConvert({ title: 'Caliban\'s War' }, 'release')); // Key 'release' is not a key of object
console.log(extractAndConvert({ title: 'Leviathan Wakes' }, 'title')); // 'Leviathan Wakes'

// Generic classes

class DataStorage<T extends string | number | boolean> {
   private data: T[] = [];

   addItem(item: T) {
      this.data.push(item);
   }

   removeItem(item: T) {
      if (this.data.indexOf(item) !== -1) {
         this.data.splice(this.data.indexOf(item), 1);
      }
   }

   getItems() {
      return this.data;
   }

}

const textStorage = new DataStorage<string>();
textStorage.addItem('Andy');
textStorage.addItem('Ade');
textStorage.removeItem('Andy');
console.log(textStorage.getItems()); // [ 'Ade' ]

const flexStorage = new DataStorage<number | boolean>();
flexStorage.addItem(true);
flexStorage.addItem(false);
flexStorage.addItem(100);
flexStorage.removeItem(false);
console.log(flexStorage.getItems()); // [ true, 100 ]

// Generic utility types - Partial

interface ShipDetails {
   name: string;
   navy: string;
   commissioned: Date;
}

const createShip = (name: string, navy: string, date: Date): ShipDetails => {
   let ship: Partial<ShipDetails> = {};
   ship.name = name;
   ship.navy = navy;
   ship.commissioned = date;
   return ship as ShipDetails;
};

const createdShip = createShip('Tachi', 'MCRN', new Date(2350, 0, 1));
console.log(createdShip); // { name: 'Tachi , navy: 'MCRN', commissioned: 2345-1-01T00:00:00.000Z }

// Generic utility types - Readonly

const names: Readonly<string[]> = ['McDowell', 'Ade'];
// names.push('Amos'); // Cannot update readonly variable
