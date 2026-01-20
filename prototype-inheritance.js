Understanding summary:
  const d=new Date()
  console.log(Date.prototype)
  console.log(d.prototype)
  // ######
  console.log(Object.getPrototypeOf(d))

  // prototype --> available on constructor function
  // [[Prototype]] --> every object internally has it and can't be accessed directly
  // __proto__ --> a getter/setter that exposes [[Prototype]]
    // available as Object.prototype.__proto__ // not recommended for production

Why __proto__ is discouraged
  Performance – prototype mutation is slow
  Clarity – hides intent
  Historical baggage – introduced before ES5

Object.getPrototypeOf() returns that internal prototype i.e. [[Prototype]]
  This is equivalent to:
    d.__proto__ === Date.prototype === Object.getPrototypeOf(d) // true
  
Visual Model:
  d
  ↓ [[Prototype]]
  Date.prototype
  ↓ [[Prototype]]
  Object.prototype
  ↓
  null

console.log((d.__proto__ === Date.prototype) && (Date.prototype === Object.getPrototypeOf(d))) // true

*** Every object's root prototype is the Object (i.e., {}) prototype and then end with null
Every object created via constructors or object literals ultimately inherits from Object.prototype, 
except objects created with Object.create(null), which have no prototype.

Important exception:
  Object.create(null)
  Prototype chain:
    obj → null

  ✔ No Object.prototype
  ✔ No toString, hasOwnProperty, etc.

Why this exception exists
  Objects without Object.prototype are useful for:
    Dictionary / map objects
    Avoiding key collisions (toString, constructor)
    Security-sensitive code
    Example:
    const dict = Object.create(null);
    dict["toString"] = "safe";

    console.log(dict.toString); // "safe"

Primitives are not objects:
  - don’t have prototype chains
'abc'.toUpperCase(); // uses String.prototype temporarily

let num=1
console.log(num instanceof Number)
let numobj=new Number(100)
console.log(numobj instanceof Number)
console.log('###############')

let str='hello'
console.log(str instanceof String)
let strobj=new String('hello')
console.log(strobj instanceof String)
console.log('###############')
// Object.getPrototypeOf can solve this to compare object type
console.log(Object.getPrototypeOf(num))
console.log(Object.getPrototypeOf(numobj))
console.log('---------------')
console.log(Object.getPrototypeOf(str))
console.log(Object.getPrototypeOf(strobj))

Refer Example: ObjectInstanceOfClass.js

Summary Table:
| Value                 | Ends at `Object.prototype`? |
| --------------------- | --------------------------- |
| `{}`                  | ✅ Yes                       |
| `[]`                  | ✅ Yes                       |
| `new Date()`          | ✅ Yes                       |
| `function(){}`        | ✅ Yes                       |
| `Object.create(null)` | ❌ No                        |
| Primitives            | ❌ Not objects               |

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/696eeb4c-5ed4-8322-995c-fa210891c708
############################


############################
In JS, everything is an object
every object in javascript has master Object and has a property called prototype, 
which allows to add new properties/methods.
when a new object is created from the prototype obejct, new object uses its properties.
advantage: *** DO NOT DRY***, prototype can be used when a variable or function/behaviour needs to be shared among the instances of function

const p1={
  fname: "pavan",
  lname: "bhogala",
  getFullName(){
    return `${this.fname} ${this.lname}`
  }
}

//const p2=Object.create(p1) // __proto__ is assigned with p1
// OR equivalent of above to create from prototype
const p2={
  __proto__: p1
}
console.log(p2) // empty object
console.log(p2.__proto__) // prints all data in p1
console.log(p2.__proto__.fname)
console.log(p2.__proto__.getFullName())
// inheritance (gets value from __proto as fname is not available in p2 directly)
console.log(p2.fname)
console.log(p2.getFullName())

p2.__proto__.fname="Hack"
console.log('p1 after hack:', p1) // since object is pass by reference in JS

// REAL WORLD Examples
let fname='pavan bhogala'
//several functions are available from wrapper classes 
//e.g. in String, functions like concat, lastIndexOf, charAt, length are available automatically
console.log(fname.__proto__) // prints String wrapper object with all functions, String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}

Another example:
----------------
// run this in browser console
const p1={
  name: 'pavan',
  age: 30
}

const p2={
  phone: '70988888',
  __proto__: p1 // inherits p1 and then p1 inherits Object's prototype
}

const p3={
  city: 'hyd',
  __proto__: p2 // inherits p2 and then p1 then p1 inherits Object's prototype
}

console.log(p3)
// ###############################################################################################################################
object created using new (constructor-based object creation):
how it works internally:
when you do:
  function Person(name){
    this.name=name
  }

  const p1=new Person();

  JavaScript does four things:
    - Creates a new empty object {}
    - Sets its internal [[Prototype]] (i.e. __proto__) to Person.prototype
    - Binds this inside Person to the new object
    - Returns the object (unless constructor returns another object)


add new method to object created from constructor function:
  Person.prototype.greet=function(){
    return `Hello ${this.name}`
  }
  console.log(p1.name)
  console.log(p1.greet())

Object.create() (Pure prototypal inheritance):
How it works:
  Object.create(proto) creates a new object with its prototype explicitly set to proto
  const personProto={
    name: 'pavan',
    getName(){
      return `Hello ${this.name}`
    }
  }

  const p2=Object.create(personProto)
  p2.name='guru'
  console.log(p2.getName()) // Hello guru

  👉 No constructor function
  👉 No this binding logic
  👉 Just direct prototype linkage

Property descriptors:
---------------------
  Only Object.create() allows to define properties at creation time.
  const emp=Object.create({}, {
    name:{
      value: 'Pavan',
      writable: false,
      enumerable: false
    }
  })

  emp.name='Guru'
  console.log(emp.name)
  ❌ Cannot do this directly with new

Memory & Prototype Chain:
  Both share methods via prototype:

  p1.__proto__ === Person.prototype      // true
  p2.__proto__ === personProto            // true

  No memory difference if used correctly.

Does Object.create() call the constructor?
No. Never.
// ###############################################################################################################################
Difference between __proto__ and prototype:

Interview-ready explanation (memorize this)
prototype is a property of constructor functions that defines what will be shared by all instances (created by using new)
__proto__ is an internal reference on objects that points to their prototype and is used for property lookup.
When an object is created using new, its __proto__ is set to the constructor’s prototype.

1️⃣ prototype (belongs to constructor functions)
What it is
prototype is a property on a constructor function.
It defines what will be shared by all objects created using new.

Example
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, I am ${this.name}`;
};


Here:
Person.prototype is an object
Methods added here are shared by all instances
When it’s used
During object creation with new.

2️⃣ __proto__ (belongs to objects)
What it is
__proto__ is an internal reference (accessor) on every JavaScript object.
It points to the object’s prototype (what it inherits from).

Example
const p1 = new Person("Pavan");
p1.__proto__ === Person.prototype; // true

Key idea
__proto__ connects an instance to its constructor’s prototype.

3️⃣ How they work together (MOST IMPORTANT)
function Person() {}
const p = new Person();


Internally JavaScript does:
p.__proto__ = Person.prototype

✔️ That’s the bridge between prototype and __proto__.
4️⃣ Property lookup (Prototype Chain)
p.sayHello();

JS engine looks for sayHello in this order:
p (own property)
p.__proto__ → Person.prototype

Person.prototype.__proto__ → Object.prototype
null → stop

5️⃣ Visual diagram
Person (function)
  |
  └── prototype
        |
        └── sayHello()

p (object)
  |
  └── __proto__ ───────▶ Person.prototype

6️⃣ Key differences table
Feature	prototype	__proto__
Belongs to	Constructor function	All objects
Purpose	Defines shared properties	Points to an object’s prototype
Used when	Creating objects	Property lookup / inheritance
Standard API	✅ Yes	❌ Legacy (but widely supported)
Should you use it?	✅ Yes	⚠️ Avoid in production
7️⃣ Modern & correct way (avoid __proto__)

Instead of:
obj.__proto__ = proto;

Use:
Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, proto);

###############################
