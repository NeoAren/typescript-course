// TypeScript Basics: Enums

enum Role { CEO, CFO, CSO, CTO }

const persons: {
   name: string;
   age: number;
   role: Role;
}[] = [
   {
      name: 'Fred Johnson',
      age: 56,
      role: Role.CEO // role === 0
   },
   {
      name: 'Camina Drummer',
      age: 32,
      role: Role.CFO // role === 1
   },
   {
      name: 'Klaes Ashford',
      age: 65,
      role: Role.CSO // role === 2
   }
];

persons[1].role = Role.CTO; // role === 3

console.log(persons[2]); // { name: 'Klaes Ashford', age: 68, role: 2 }
