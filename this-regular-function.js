In case of regular function, this is not fixed
the value of this inside a regular function depends entirely on how the function is called, not where it's written.

one-line trick to instantly figure out this in any regular function call
Look to the left of the dot when the function is called - that's your this.

Examples
1. Dot present → this is the object before the dot

const person={
  name: 'Pavan',
  start: function(){
    console.log(`${this.name}`)
  }
}

person.start() // the assigner is whoever doing the calling

---
2. No dot → global object (or undefined in strict mode)
function showBrand() {
  console.log(this.brand);
}

showBrand(); // undefined (strict mode) OR window.brand (non-strict)

---
3. Chained dots → the immediate left counts
const garage = {
  car: {
    brand: "BMW",
    start: function() {
      console.log(this.brand);
    }
  }
};

garage.car.start(); // "BMW" ← left of dot is `garage.car`

---
4. Call stored in a variable → loses caller info
const bike = {
  brand: "Yamaha",
  start: function() {
    console.log(this.brand);
  }
};

const startBike = bike.start;
startBike(); // undefined → no left-of-dot

This “left-of-dot rule” works for regular functions.
Arrow functions are the rebel children — they ignore this rule and just take this from where they were created.


  Here’s the JavaScript this decision flowchart for quick reference:

                ┌─────────────────────────────────┐
                │  Is it an arrow function?        │
                └───────────────┬─────────────────┘
                                │
                     YES ───────┘
                     │
                     ▼
   `this` = From surrounding scope (lexical binding)
                     ▲
                     │
            NO ──────┘
                     │
                     ▼
   Is the function called with `new` keyword?
                     │
        YES ─────────┘
        │
        ▼
   `this` = The new object being created
        ▲
        │
   NO ──┘
        │
        ▼
   Is it called with `.call()`, `.apply()`, or `.bind()`?
        │
  YES ──┘
  │
  ▼
`this` = The first argument passed to call/apply/bind
  ▲
  │
NO ──┘
  │
  ▼
Is there an object to the **left of the dot** at call time?
  │
 YES ──► `this` = That object
  │
  NO
  │
  ▼
`this` = Global object (window in browsers) or undefined in strict mode


Example mapping:
Arrow function: (usually closest regular function or module where the arrow was called, if no regular function catches it, it endsup with global (this))
const obj = {
  name: "Pavan",
  arrow: () => console.log(this.name)
};
obj.arrow(); // undefined (inherits from surrounding scope, not obj)

new keyword:
------------
   function Person(name, newage){
    this.name=name; // if not attached to this, then it's local to the function and not accessible for the object
    age=newage
  }
  const p=new Person('pavan') // `this` → new object { name: "Pavan" }
  console.log(p.name)
  console.log(p.age)

Explicit binding:
------------------
function greet() { console.log(this.name); }
greet.call({ name: "Pavan" }); // "Pavan"

Left-of-the-dot:
----------------
const car = { brand: "Tesla", start() { console.log(this.brand); } };
car.start(); // "Tesla"

No caller:
---------
function test() { console.log(this); }
test(); // window or undefined in strict mode

  
