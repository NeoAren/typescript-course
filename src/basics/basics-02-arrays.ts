// TypeScript Basics: Arrays

const ships: string[] = [ 'Rocinante', 'MCRN Donnager', 'UNN Agatha King', 'MCRN Scirocco' ];

// ships.push({ class: 'Truman', name: 'UNN Thomas Prince' }); // Invalid update

ships.push('UNN Thomas Prince');

for (const ship of ships) {
   console.log(ship);
}
