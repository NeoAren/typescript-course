// TypeScript Basics: Core Types

// If type can be inferred from initial value, then type declaration is redundant
const number1 = 123;
const number2: number = 123;

// Numbers
const pi = 3.14;
const life = 42;

// Strings
const phrase1 = 'Lorem ipsum dolor sit amet';
const phrase2 = "Lorem ipsum dolor sit amet";
const phrase3 = `Lorem ipsum dolor sit amet`;

// Boolean
const bool1 = true;
const bool2 = false;

// Any
let input1: any;
input1 = 123;
// input1.map(x => console.log(x)); // Incorrect, but causes runtime error only

// Unknown
let input2: unknown;
input2 = [ 1, 2, 3 ];
// input2.map(x => console.log(x)); // Correct, but causes compile error only
