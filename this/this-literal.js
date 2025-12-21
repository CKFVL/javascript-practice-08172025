Environment	        Mode	        Global this (top-level)	           Function this (non-method)
Browser	            Non-strict	    window(refers to global object)	      window
                    Strict	        undefined	                          undefined
Node.js	            Non-strict	    module.exports(initially {})	      global
                    Strict	        module.exports(initially {})	      undefined

Browser (scripts, not modules):
  Non-strict mode (global scope)
    this refers to the global object, which is window in browsers.
    Example:
    console.log(this); // window
  
  Strict mode (global scope)
    this is undefined.
    Example:
    'use strict';
    console.log(this); // undefined

🖥️ Node.js (CommonJS modules):
Here’s where it gets subtle:
Global scope in a CommonJS file
  -  this is not the global object.
  -  Instead, at the top level of a CommonJS module, this is equivalent to module.exports.
Example:
console.log(this === module.exports); // true
console.log(this === global); // false

Strict vs Non-strict mode
-  In both strict and non-strict mode, at the top level of a CommonJS module, this is module.exports (initially {}).
-  Inside functions, however, strict mode changes behavior:
    Non-strict: this defaults to the global object (global).
    Strict: this stays undefined.
So your Node.js  summary is almost correct, but slightly oversimplified:
Top-level this → always module.exports (strict or non-strict).
Inside functions → differs (global vs undefined).
######################################

*** only functions create scope, not objects.
function () { } → creates new this
() => { } → does NOT create new this
{ } object literal → does NOT create new this
example:
let length = 10;
const object = {
  length: 5,
  log: () => {
    console.log(this.length);
  },
};

object.log(); // output: 10
###########################
Is the function an arrow function?
  │
  ├── YES → Inherit `this` from surrounding scope
  │             ▲
  │             │
  │    Closest enclosing scope:
  │      ├─ Regular function? → Use its `this`
  │      ├─ Another arrow? → Keep climbing outward
  │      └─ Global/module? → Use global/module `this`
  │
  └── NO (Regular function)
        │
        ├── Called with `new`? → `this` = New object
        │
        ├── Called with .call/.apply/.bind?
        │        → `this` = First argument passed
        │
        ├── Called as obj.method()? → `this` = Object left of dot
        │
        └── None of the above?
                 → `this` = Global object (non-strict) or undefined (strict)
Example:
------
  const obj={
  name:'pavan',
  log: ()=>{
    console.log(this.name)
  }
}

obj.log()

const obj2={
  name:'pavan',
  log: function(){
    console.log(this.name)
  }
}

obj2.log()

const obj3={
  name:'pavan',
  log: function(){
    console.log('function ',this.name)
    setTimeout(()=>{
      console.log('arrow timeout',this.name)
    }, 1000);
  }
}

obj3.log()
