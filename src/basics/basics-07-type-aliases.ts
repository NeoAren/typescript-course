// TypeScript Basics: Type Aliases

type ShipType = 'battleship' | 'dreadnought' | 'cruiser' | 'frigate' | 'destroyer';
type ShipAlliance = 'UNN' | 'MCRN' | 'OPA';
type Ship = { name: string, class: string, alliance: ShipAlliance, type: ShipType };

const introduce = (ship: Ship) => {
   console.log(`The ${ship.alliance} ${ship.name} is a ${ship.class}-class ${ship.type}.`);
};

// introduce({ name: 'Super Star Destroyer', class: 'Executor I', alliance: 'Galactic Empire', type: 'dreadnought' }) // Invalid arguments

introduce({ name: 'Barkeith', class: 'Donnager', alliance: 'MCRN', type: 'battleship' });

introduce({ name: 'Okimbo', class: 'Truman', alliance: 'UNN', type: 'dreadnought' });
