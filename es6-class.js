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

OR
-----
Function-based (pre-ES6 style)
  function Person(name){
    this.name=name;
  }

  Person.prototype.sayHi=function(){
    console.log(`Hi, I'm ${this.name}`)
  }

  const p1=new Person('pavan')

ES6 Class:
  class Person{
    constructor(name){
      this.name=name
    }

    sayHi(){
      console.log(`Hi, I'm ${this.name}`)
    }
  }

  const p1=new Person('Pavan')

Internally, ES6 classes are just syntactic sugar over prototypes

Key Differences:
  - Hoisting behavior
    Function:
      const p=new Person('A'); // works
      function Person(name){
        this.name=name;
      }

    Class:
      const p=new Person('A')
      class Person{}

  - Strict mode
      Functions -> not strict by default
      Classes -> always run in strict mode
    
  - Calling without new
      Function:
        function Person(name){
          this.name=name
        }
        Person('Pavan') // can pollute global object

      Class:
        class Person{}
        Person(); // TypeError

  - Prototype handling
      Function:
        - you manually attach methods to prototype
      Class:
        - cleaner syntax, but still uses prototype internally

  - enumerability
      Function prototype methods:
        Object.keys(Person.prototype)
  
      Class methods:
        Object.keys(Person.prototype)
  - Inheritance
      Function
        function Animal(){}
        function Dog(){}

        Dog.prototype=Object.create(Animal.prototype)

      Class:
        class Animal{}
        class Dog extends Animal{}

    Classes make inheritance much simpler

Understanding summary:
    ES6 Classes provide built-in inheritance (extends, super)
    better for OOP style design

    Functions (can act as)
        - factory
        - normal function
        - constructor

    better for functional style programming
    Easier to compose and curry
    you can use closures

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
Feature	Constructor         Function	                              ES6 Class
Syntax	                    Function + manual prototype methods	    class { constructor() { } method() { } }
Prototype methods	          Must assign manually	                  Declared inside class body automatically
Hoisting	✅                 Function declarations hoisted	        ❌ Class declarations not hoisted
Call without new	          Possible (buggy: this global/undefined)	❌ Throws TypeError
Strict mode	                Optional	                              Always in strict mode
enumerable of methods	      Methods are enumerable	                Methods are non-enumerable by default
Subclassing / inheritance	  Via Object.create / manual setup	      Built-in extends and super keywords
Private fields	            ❌ Manual (closures/WeakMaps needed)	  ✅ Native support with #field (ES2022+)
#######################################
class Mammal {
    // empty constructor will be provided by default if no constructor declared
}

class Bat extends Mammal {
    constructor(f, ...args) {
        super() // this line is mandatory in sub class
        //this.f=f;
    }
}

const newBat = new Bat('f', 'a', 'b', 'c', 'd', 'e')
console.log(newBat)

// ##########################################################################
// static methods
// static methods won't be added to prototype
// this can't be accessed in static method
class Car {
    constructor(price) {
        this.price = price
    }

    static sellCar(car) {
        return `selling for ${car.price}`
    }
}

class Toyota extends Car {
    constructor(price) {
        super(price)
    }
    static sellCar(car) {
        console.log(this.price)
        return `Toyota ${super.sellCar(car)}`; // call static method in super class
    }
    sellNewCar(car) {
        console.log(this.price)
        return `new Toyota ${this.price}`; // use variable in super class
    }
}
const camry = new Toyota(100)
console.log(Toyota.sellCar(camry))

const newcamry = new Toyota(300)
console.log(newcamry.sellNewCar(newcamry))
