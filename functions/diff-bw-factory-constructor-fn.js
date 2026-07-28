Use a Factory Function when you want simplicity, encapsulation, or privacy.
Use a Constructor Function (or class) when you want prototype-based inheritance and method sharing.

#################################
Constructor function: A constructor function is a function meant to be used with new.
--------------------
function Counter(){
  let count=0;
  
  return {
    increment: () => {
      count++
      return count;
    },
    reset: () => {
      count=0
      return count
    }
  }
}
let count = new Counter(); // This still works, but new is useless here because returning {...} overrides new, so new is ignored
JS Internally does roughly this:
  1. let obj={} // create empty object
  2. obj.__proto__ = Counter.prototype; // link prototype
  3. let result = Counter.call(obj) // call function with this = obj

  4. if (result is object) return result;
      else return obj;


🔥 Rule (VERY IMPORTANT)
If a constructor returns an object, that object becomes the result of new.
If it returns a primitive (number, string, etc.) or nothing, it is ignored.


So, 
  console.log(Object.getPrototypeOf(count) === Counter.prototype); // false
  console.log(Object.getPrototypeOf(count) === Object.prototype); // false
---
function Car(color) {
  this.color = color;
}
Car.prototype.drive = function () {
  console.log(`driving ${this.color} car`);
};

const blueCar = new Car("blue");
blueCar.drive(); // driving blue car

Characteristics:
  Invoked with new.
  this refers to the new object being constructed.
  Methods are placed on Car.prototype, so shared across all instances.
Faster in memory usage (methods not duplicated per object).
If you forget new, this may point to the global object (or undefined in strict mode).

Another example:
let Car=function(){
  let _car=function(_color){
    this.color=_color
  }
  
  _car.prototype.drive=function(){
    console.log('driving '+this.color+' car')
  }
  
  return _car;
}

let carConstructor=Car(); // get the inner constructor
let redCar=new carConstructor('red');
redCar.drive()

// even cleaner with IIFE
let Car=(function(){
  let _car=function(_color){
    this.color=_color
  }
  
  _car.prototype.drive=function(){
    console.log('driving '+this.color+' car')
  }
  
  return _car;
})();

//let carConstructor=Car(); // get the inner constructor
let redCar=new Car('black');
redCar.drive()

##############################