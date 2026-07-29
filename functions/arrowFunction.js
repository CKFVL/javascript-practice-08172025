Arrow functions do not have a prototype property.
console.log(createPerson.prototype);

Output:
undefined
because arrow functions cannot be used as constructors.