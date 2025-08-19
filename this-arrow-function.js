this is lexical in arrow function (taken from surrounding scope)
When we say an arrow function gets this from its surrounding scope, we mean:
It doesn’t create its own this. Instead, it “closes over” (remembers) the value of this from where it was defined, not from how it’s called.

to sum it up, where the closest regular function or module where the arrow function was called.
  If no regular function catches it, then it ends up with global.


Here’s the “Arrow Function this Inheritance Chain” visual in text form so you can picture it:

Arrow Function Created Here
          │
          ▼
Does arrow function have its own `this`?
  │
  └── No → Look one scope out
                 │
                 ▼
  Is this scope a regular function?
    │
    ├── Yes → Use that function's `this`
    │
    └── No → Keep climbing outward
                     │
                     ▼
    Did we reach global/module scope?
        │
        ├── Yes → Use global/module `this`
        └── No → Keep climbing...

Example — Climbing Chain:
const outerObj = {
  name: "Outer",
  outerFn: function() {
    const arrow1 = () => {
      console.log(this.name);
    };
    arrow1(); // "Outer"
  }
};

outerObj.outerFn();
Here:
arrow1 has no this.
It looks to outerFn (regular function) for this.
outerFn's this → outerObj.

Example — More Levels
function Outer() {
  this.name = "Pavan";

  function middleFn() {
    const arrowFn = () => console.log(this.name);
    arrowFn();
  }

  middleFn();
}

new Outer();

arrowFn looks to middleFn for this.
middleFn is a regular function, but called without a dot → this is global/undefined.
So arrowFn also gets global/undefined.

*** One-line memory trick:
---------------------
Arrow functions play “hot potato” with this until a regular function catches it.
If no regular function catches it, it ends up with the global this.
---
Example 1 — Arrow inside a method
const person={
  name: 'pavan',
  regularFn: function(){
    const arrFn=()=>{
      console.log(`${this.name}`)
    }
    
    arrFn();
  }
}

person.regularFn()
arrowFn has no this of its own.
It takes this from regularFn’s scope.
In regularFn, this → obj, so arrowFn also sees obj.
---
Example 2 — Arrow at global level
const arrow = () => {
  console.log(this);
};

arrow(); // window (browser) or {} (Node)
---
Example 3 - 
function Timer() {
  this.seconds = 0; // OR seconds=0
  setTimeout(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
Timer() // works
---
Example 4 — Arrow in setTimeout
function Timer() {
  this.seconds = 0;
  setTimeout(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

new Timer();
// Works — arrow gets `this` from Timer’s constructor function scope

// If we used a regular function inside setInterval, this would be window or undefined.
function Timer() {
  this.seconds = 0;
  setTimeout(function(){
    this.seconds++; // Look to the left of the dot when the function is called - that's your this.
    console.log(this.seconds);
  }, 1000);
}

new Timer(); //NaN
---


