https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a683a38-ccc0-83ee-affc-4fc50b0f88cf

Factory function: A factory function is a normal function that returns an object.
----------------
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
  Just a function that returns an object.
  Doesn’t require new.
  *** this is optional — you can use closures instead.
  No prototype chain (each object gets its own copy of methods unless optimized with Object.create).
  https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a683a38-ccc0-83ee-affc-4fc50b0f88cf
  Great for encapsulation (can use private variables via closure).
  More flexible, avoids new keyword issues.
