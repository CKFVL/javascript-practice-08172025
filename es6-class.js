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

Characteristics:
Just a function that returns an object.
Doesn’t require new.
this is optional — you can use closures instead.
No prototype chain (each object gets its own copy of methods unless optimized with Object.create).
Great for encapsulation (can use private variables via closure).
More flexible, avoids new keyword issues.
##############################
Constructor function: A constructor function is a function meant to be used with new.
--------------------
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
In short:
Use a Factory Function when you want simplicity, encapsulation, or privacy.
Use a Constructor Function (or class) when you want prototype-based inheritance and method sharing.

Example with private data:
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private via closure

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    }
  };
}

const acc = createBankAccount(100);
acc.deposit(50);
console.log(acc.getBalance()); // 150
console.log(acc.balance);      // undefined ❌ (private!)
##############################
ES6 class is really just syntactic sugar over constructor functions + prototypes, but there are important differences in behavior.

  function Car(color) {
  this.color = color;
}

Car.prototype.drive = function () {
  console.log(`driving ${this.color} car`);
};

let redCar = new Car("red");
redCar.drive(); // driving red car

Key points:
Plain function, invoked with new.
Prototype methods defined manually (Car.prototype.method = ...).
If you forget new, this will point to global object (or undefined in strict mode).

ES6 Class (sytatic sugar)
class Car {
  constructor(color) {
    this.color = color;
  }

  drive() {
    console.log(`driving ${this.color} car`);
  }
}

let blueCar = new Car("blue");
blueCar.drive(); // driving blue car

Key points:
-  Syntatic sugar
-  constructor() is where you initialize instance data.
-  Methods automatically go on the prototype (just like in constructor functions).
-  class is not hoisted (unlike function declarations).
-  Calling without new throws a TypeError → safer.

#######################################
Side-by-Side Comparison
Feature	Constructor Function	ES6 Class
Syntax	Function + manual prototype methods	class { constructor() { } method() { } }
Prototype methods	Must assign manually	Declared inside class body automatically
Hoisting	✅ Function declarations hoisted	❌ Class declarations not hoisted
Call without new	Possible (buggy: this global/undefined)	❌ Throws TypeError
Strict mode	Optional	Always in strict mode
enumerable of methods	Methods are enumerable	Methods are non-enumerable by default
Subclassing / inheritance	Via Object.create / manual setup	Built-in extends and super keywords
Private fields	❌ Manual (closures/WeakMaps needed)	✅ Native support with #field (ES2022+)
