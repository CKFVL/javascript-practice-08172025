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

