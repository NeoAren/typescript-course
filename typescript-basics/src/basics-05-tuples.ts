// TypeScript Basics: Tuples

const person: {
   name: string;
   age: number;
   case: [number, string] // Tuple contains number and string
} = {
   name: 'Josephus Miller',
   age: 43,
   case: [142367, 'Julie Mao case']
};

// person.case = [142368, false]; // Invalid update

person.case = [73541, 'Loca Greiga disappearance'];

console.log(person); // { name: 'Josephus Miller', age: 43, case: [73541, 'Loca Greiga disappearance'] }
