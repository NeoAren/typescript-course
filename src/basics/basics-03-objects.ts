// TypeScript Basics: Objects

const rocinante: {
   owner: string;
   class: string;
   crew: string[];
} = {
   owner: 'Martian Congressional Republic Navy',
   class: 'Corvette',
   crew: [ 'Lieutenant Lopez' ]
};

// rocinante.owner = false // Invalid update

rocinante.owner = 'Rocicorp';

rocinante.crew = [ 'James Holden', 'Naomi Nagata', 'Alex Kamal', 'Amos Burton' ];

console.log(rocinante); // { owner: 'Rocicorp', class: 'Corvette', crew: [ ... ] }
