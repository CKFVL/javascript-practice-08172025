Environment	              Mode	          Global this (top-level)	           Function this (non-method)
Browser	                  Non-strict	    window(refers to global object)	    window
(scripts, not modules)    Strict	        undefined	                          undefined
---------------------------------------------------------------------------------------------------------
Node.js	                  Non-strict	    module.exports(initially {})	      global
                          Strict	        module.exports(initially {})	      undefined
---------------------------------------------------------------------------------------------------------
Browser	                  Non-strict	    window(refers to global object)	      window
(dev tools)               Strict	        window(refers to global object)	    undefined

Rule of thumb 🧠
Never rely on DevTools console behavior to understand `this`

Quick comparison
Environment	          Strict             Mode	        this
Browser               DevTools console	  Yes	        window
Browser               <script> file	      Yes	        undefined
Browser ES module	    Always              strict	    undefined
Node.js               REPL	              Any	        global
Node.js               CommonJS file	      Any	        module.exports

Browser (scripts, not modules):
------------------------------
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
------------------------------
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

Example (in nodejs):
---------
console.log(this)
this.color='wewe'
console.log('global color', this.color)

var color='efewew'
console.log('global color', this.color)
console.log('var color..', color)
console.log('##################')
let Car=function(_color){ // constructor function
  console.log(this) // local to constructor function
  this.color=_color // local to constructor function
  console.log('constrcutor fn init', this.color) 
  color=_color // changes var color
}
let newcar=new Car('green')
console.log('global color', this.color) // wewe
console.log('var color', color) // green
console.log('##################')
let regCar=function(_color){
  console.log(this) // window i.e. global in non-strict mode and undefined in strict mode
  //this.color=_color // TypeError: Cannot set properties of undefined 
  // console.log('regular fn init', this.color) // TypeError: Cannot read properties of undefined
  color=_color // var color will be chnaged
}

let car2=regCar('lightyellow')
console.log('global color', this.color) // wewe
console.log('var color', color) // lightyellow

const arrCar=(__color)=>{
  console.log(this) // inherits from parent scope
  this.color==__color
  // color=__color // var color changes
}
arrCar('lightblue')
console.log('global color', this.color) // lightblue
console.log('var color', color) // lightyellow

// object literal
const person={
  name: 'pavan',
  regFn: function(){
    console.log('object literal reg function', this) // object literal
  },
  arrFn: ()=>{
    console.log('object literal arrow function', this) // global color from `this`
  }
}
person.regFn()
person.arrFn()


Output ('use strict')
---------
{}
global color wewe
global color wewe
var color.. efewew
##################
Car {}
constrcutor fn init green
global color wewe
var color green
##################
undefined
global color wewe
var color lightyellow
{ color: 'wewe' }
global color wewe
var color lightyellow
object literal reg function { name: 'pavan', regFn: [Function: regFn], arrFn: [Function: arrFn] }
object literal arrow function { color: 'wewe' }

Output (not strict mode)
---------
// non-strict mode
console.log(this) // {}
this.color='wewe'
console.log('global color', this.color) // wewe

var color='efewew'
console.log('global color', this.color) // wewe
console.log('var color..', color) // efewew
console.log('##################')
let Car=function(_color){ // constructor function
  console.log(this) // local to constructor function
  this.color=_color // local to constructor function
  console.log('constrcutor fn init', this.color) 
  color=_color // changes var color
}
let newcar=new Car('green')
console.log('global color', this.color) // wewe
console.log('var color', color) // green
console.log('##################')
let regCar=function(_color){
  console.log(this) // window i.e. global in non-strict mode and undefined in strict mode
  console.log(global)
  console.log('this===global --->', this===global)
  this.color=_color // global
  console.log('regular fn init', this.color) // global===this
  color=_color // var color will be chnaged
}
console.log('regular function....')
let car2=regCar('lightyellow')
console.log('global color', this.color) // lightyellow but printing wewe why??
console.log('var color', color) // lightyellow

console.log('arrow function....')
const arrCar=(__color)=>{
  console.log(this) // inherits from parent scope i.e. global
  this.color=__color
  // color=__color // var color changes
}
arrCar('lightblue')
console.log('global color', this.color) // lightblue
console.log('var color', color) // lightyellow

console.log('object literal...')
// object literal
const person={
  name: 'pavan',
  regFn: function(){
    console.log('object literal reg function', this) // object literal
  },
  arrFn: ()=>{
    console.log('object literal arrow function', this) // global color from `this`
  }
}
person.regFn()
person.arrFn()

{}
global color wewe
global color wewe
var color.. efewew
##################
Car {}
constrcutor fn init green
global color wewe
var color green
##################
regular function....
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter]
}
<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter]
}
this===global ---> true
regular fn init lightyellow
global color wewe
var color lightyellow
arrow function....
{ color: 'wewe' }
global color lightblue
var color lightyellow
object literal...
object literal reg function { name: 'pavan', regFn: [Function: regFn], arrFn: [Function: arrFn] }
object literal arrow function { color: 'lightblue' }

#########################
Above Example (in browser console-dev tools- 'use strict')
(this equals window object)
Output:
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM418:4 global scope: qwewq
VM418:7 var scope: sdsdf
VM418:16 constructor function:  purple
VM418:18 global scope again: purple
VM418:19 var scope again: purple
VM418:23 function (non-method) undefined
VM418:29 this in arrow fn:  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM418:37 object literal regular function {name: 'pavan', regFn: ƒ, arrFn: ƒ}
VM418:40 object literal arrow function Window {window: Window, self: Window, document: document, name: '', location: Location, …}
---
(in browser console-dev tools- 'non strict mode')
Output:
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM422:4 global scope: qwewq
VM422:7 var scope: sdsdf
VM422:16 constructor function:  purple
VM422:18 global scope again: purple
VM422:19 var scope again: purple
VM422:23 function (non-method) Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM422:29 this in arrow fn:  Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM422:37 object literal regular function {name: 'pavan', regFn: ƒ, arrFn: ƒ}
VM422:40 object literal arrow function Window {window: Window, self: Window, document: document, name: '', location: Location, …}
