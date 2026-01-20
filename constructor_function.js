how constructor function works in javascript
ChatGPT said:

In JavaScript, constructor functions are a traditional way (before ES6 classes) to create multiple similar objects using the new keyword.

Let’s break it down clearly and intuitively.

✅ What is a Constructor Function?

A constructor function is just a normal function, but by convention:

It starts with Capital letter

It is meant to be called using new

Example:

function Person(name, age) {
    this.name = name;
    this.age = age;
}


When you call:

const p = new Person("John", 30);


This triggers special behavior.

🎯 How new Works Step-by-Step

Whenever you call a function using new, these 4 steps occur automatically:

Step 1: A brand-new empty object is created
const obj = {};

Step 2: The new object gets linked to the constructor’s prototype
obj.__proto__ = Person.prototype;


This is how objects created from the constructor share methods.

Step 3: this inside the constructor is bound to the new object

When JS executes:

Person("John", 30);


Internally it becomes:

this = obj;
this.name = "John";
this.age = 30;

Step 4: The function returns the new object automatically

If you don’t return anything, JS returns this.

🚫 If you return a primitive (string/number/boolean), JavaScript ignores it.
✔️ If you return an object manually, it overrides the default return.
🎉 Putting it all together
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const p1 = new Person("Alice", 25);
console.log(p1);

Output:
Person { name: 'Alice', age: 25 }

⭐ Adding Methods Using Prototype

Constructor functions commonly add shared methods on prototype:

Person.prototype.sayHi = function() {
    console.log("Hi, I'm " + this.name);
}

p1.sayHi(); 


*** Prototype-based methods are shared, not duplicated per object. ***

⚡ BONUS: What happens without new?
const p = Person("John", 30);


No object is created.

this is window (in browser) or undefined (strict mode).

Properties get assigned to global object → Bad.

✔️ Fix using new.target (ES6)
function Person(name) {
    if (!new.target) {
        return new Person(name);
    }
    this.name = name;
}


Now calling without new still works correctly.

🚀 Constructor Function vs ES6 Class

These are equivalent:

function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function() {
    console.log("Hi");
}


Same as:

class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log("Hi");
    }
}


"Classes" are syntactic sugar over constructor functions.

🔥 Want a mental model?
Concept	        Constructor Function	Similar to
Blueprint	    Person	                Java class
Instance object	new Person()	        Object created from class
Shared methods	Person.prototype	    Class methods

#####
function Car(){
  this.make='kia'
  
  return {make: 'tata'}
}

const mycar=new Car();
console.log(mycar.make)
#####
(()=>{
  let x=(y=10)
})()

console.log(typeof x)

################
Drawbacks of constructor function:
Understanding summary:
    -   constructor function body is passed as a string and evaluated at runtime, so it can open the door to code injection
    -   often can be blocked by CSP.
    -   do not enclose surrounding scope.
    -   regualr functions are loaded once during script load but the constructor function must be parsed and compiled at runtime
        which can significantly degrade performance.
        
Preferred alternatives
// Normal function
function sum(a, b) {
  return a + b;
}

// Arrow function
const sum = (a, b) => a + b;

// Higher-order functions / closures
const makeAdder = x => y => x + y;

Reference: https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/696f7858-7ff8-832a-8e4b-18f41c088bb6