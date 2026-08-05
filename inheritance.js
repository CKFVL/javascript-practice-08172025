// use of Object.create function: achieve inheritance from one constructor in another constructor
// https://chatgpt.com/g/g-p-6a1ad6ea4ff88191a04d4bbeac5fef48-javascript-problems/c/6a72c401-df2c-83ee-a62c-b37e68e2ad6d
'use strict'
const Car = function (_color) {
  this.color = _color;
}
Car.prototype = {
  getColor() {
    return this.color;
  }
}
const ToyCar = function (_color) {
  this.color = _color
}
// set Car prototype to ToyCar prototype
// This sets up prototype chaining so that anything defined on Car.prototype becomes available to instances of ToyCar.
ToyCar.prototype = Object.create(Car.prototype);//getColor() will be inherited in ToyCar too
// you don't need this line for inheritance to work. It's mainly to keep constructor accurate. It does not affect inheritance or method lookup.
// The constructor assignment is mainly for correct metadata/introspection
// It can also matter if some code uses:
// obj.constructor
// to determine what kind of object it is.
// https://chatgpt.com/g/g-p-6a1ad6ea4ff88191a04d4bbeac5fef48-javascript-problems/c/6a72c401-df2c-83ee-a62c-b37e68e2ad6d
// Inheritance: first line
// Correct constructor reference: second line
ToyCar.prototype.constructor = ToyCar;
let toycar = new ToyCar('white');
// Since ToyCar doesn’t define its own getColor, JavaScript goes up the prototype chain and finds getColor on Car.prototype.
/*
  ToyCar instance
        ↓
  ToyCar.prototype
        ↓
  Car.prototype
        ↓
  Object.prototype
*/
// this.color inside getColor() refers to the object on which it’s called (i.e., toycar), so it returns "white".
console.log(toycar.getColor())
################################
ES6 class/extends version of your example using modern syntax:

class Car {
  constructor(_color) {
    this.color = _color;
  }

  getColor() {
    return this.color
  }
}

class ToyCar extends Car {
  constructor(_color) {
    // (super() is mandatory before using this in a subclass constructor.)
    super(_color) // calls the parent (Car) constructor
  }
}

const toycar = new ToyCar('white');
console.log(toycar.getColor()); // → "white"
