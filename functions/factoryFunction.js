https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a683a38-ccc0-83ee-affc-4fc50b0f88cf

Factory function: A factory function is a normal function that returns an object.
----------------
A factory function itself is still a JavaScript function, so it has a prototype property (unless it's an arrow function). 
However, the objects it returns are usually not linked to that prototype because you don't use new.

function createCar(color) {
  return {
    color,
    drive() {
      console.log(`driving ${this.color} car`);
    }
  };
}

const redCar = createCar("red");
redCar.drive(); // driving red car

Characteristics of factory function:
-----------------------------------
  - Just a function that returns an object.
  - Doesn’t require new.
  - *** this is optional — you can use closures instead.
  - Great for encapsulation (can use private variables via closure).
  - More flexible, avoids new keyword issues.
  - No prototype chain (each object gets its own copy of methods unless optimized with Object.create).
    https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a683a38-ccc0-83ee-affc-4fc50b0f88cf
    A factory function itself is still a JavaScript function, so it has a prototype property (unless it's an arrow function). 
    However, the objects it returns are usually not linked to that prototype because you don't use new.
    So, 
      console.log(Object.getPrototypeOf(count) === createCar.prototype); // false
      console.log(Object.getPrototypeOf(count) === Object.prototype); // false

Factory function can intentionally use a custom prototype
A factory function can create objects with any prototype.
  const personMethods = {
    greet() {
      console.log(`Hi ${this.name}`);
    }
  };

  function createPerson(name) {
    const obj = Object.create(personMethods);
    obj.name = name;
    return obj;
  }

  const p = createPerson("Pavan");
  p.greet();
  console.log(Object.getPrototypeOf(p) === personMethods);

***
The key idea is that a factory function is just a function that returns an object. 
Whether the returned object participates in a particular prototype chain depends on how the object is created, 
not on the fact that it came from a factory function. 
***
  If you return an object literal ({}), its prototype is Object.prototype. 
  If you use Object.create(somePrototype), you decide what the prototype chain will be.
***
##############################
What about arrow factory functions?
const createPerson = (name) => ({
  name
});

Arrow functions do not have a prototype property.
console.log(createPerson.prototype);

Output:
undefined
because arrow functions cannot be used as constructors.