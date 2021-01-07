// TypeScript Advanced: Third Party Libraries

// Third party vanilla JavaScript libraries are not understood
// by TypeScript, but type translations (.d.ts) can be installed
// from the DefinitelyTyped repository.

declare const thirdPartyConstant: string;

console.log(thirdPartyConstant); // No compile errors, but constant might not exist

declare function thirdPartyFunction(a: number, b: boolean): void;

thirdPartyFunction(12, false); // No compile errors, but function might not exist
