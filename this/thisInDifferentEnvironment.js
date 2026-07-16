| Environment                  | Top-level `this`                                                            | Regular function `this` (not a method)        |
| ---------------------------- | --------------------------------------------------------------------------- | --------------------------------------------- |
| **Browser Script**           | Non-strict → `window                                                        | Non-strict → `window                          |
                                 Strict → `undefined                                                           Strict → `undefined                           |
--------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Node.js (CommonJS)**       | Non-strict → `module.exports` (`{}` initially)                              | Non-strict → `global`                         |
                                 Strict → `module.exports`                                                     Strict → `undefined`                          |
--------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Browser DevTools Console** | Non-strict → `window`                                                       | Non-strict → `window`                         |
                                 Strict → `window`                                                             Strict → `undefined`                          |

*** var at the top level becomes a property of the global object (window).
  e.g., var color='efewew'
        console.log('var color..', color)

Constructor function:
--------------------
  `this` is local to constructor function

Rule of thumb 🧠
Never rely on DevTools console behavior to understand `this`
---
REPL? https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/699fad4c-4ddc-8323-90b9-a422d64b229e

When DOES it attach to global in Node?
Only if you explicitly assign it:
global.color = 'lightyellow'
console.log(global.color) // 'lightyellow'

Or in regular function (this === global)

Or in Node REPL (special case):
var color = 'lightyellow'
global.color // 'lightyellow'
---
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

Example (in nodejs- non-strict mode):
---------
console.log(this) //{} i.e. module.exports in nodejs
this.color='wewe'
console.log('global color', this.color) // wewe
console.log('module.exports', module.exports.color) // wewe
console.log('global color', global.color) // properties assigned outside of regular function won't be available in global

var color='efewew' 
console.log('global color', this.color) //wewe
console.log('var color..', color) // efewew
//console.log(window.color) // error
console.log('##################')
let Car=function(_color){ // constructor function
  console.log(this) // local to constructor function
  this.color=_color // local to constructor function
  console.log('constrcutor fn init', this.color) 
  color=_color  // var color
}
let newcar=new Car('green')
console.log('global color -->', this.color) //wewe
console.log('var color -->', color)  // green
console.log('##################')

let regCar=function(_color){
    this.color=_color // global (not equals to this or module.exports)
}

regCar('purple')
console.log(global.color) // purple
console.log(this.color) //wewe
console.log(module.exports.color) // wewe
console.log('arrow function --------')
const arrCar=(__color)=>{
  console.log(this) // inherits from parent scope
  this.color=__color
  // color=__color // var color changes
}
arrCar('lightblue')
console.log('global color', this.color) // lightblue
console.log('var color', color) // lightyellow
console.log('object literal ---------------------')
const person={
  name: 'pavan',
  regFn: function(){
    console.log('object literal reg function', this) // object literal
  },
  arrFn: ()=>{
    console.log('object literal arrow function', this) // from `this` or module.exports.color
  }
}
person.regFn()
person.arrFn()
########################################################################################
'use strict'
------------
'use strict'
console.log(this) //{} i.e. module.exports in nodejs
this.color='wewe'
console.log('global color', this.color) // wewe
console.log('module.exports', module.exports.color) // wewe
console.log('global color', global.color) // properties assigned outside of regular function won't be available in global

var color='efewew' 
console.log('global color', this.color) //wewe
console.log('var color..', color) // efewew
//console.log(window.color) // error
console.log('##################')
let Car=function(_color){ // constructor function
  console.log(this) // local to constructor function
  this.color=_color // local to constructor function
  console.log('constrcutor fn init', this.color) 
  color=_color  // var color
}
let newcar=new Car('green')
console.log('global color -->', this.color) //wewe
console.log('var color -->', color)  // green
console.log('##################')

let regCar=function(_color){
    //this.color=_color // undefined (TypeError: Cannot set properties of undefined (setting 'color'))
}

regCar('purple')
console.log(global.color) // undefined
console.log(this.color) //wewe
console.log(module.exports.color) // wewe
console.log('arrow function --------')
const arrCar=(__color)=>{
  console.log(this) // inherits from parent scope
  this.color=__color
  color=__color // var color changes
}
arrCar('lightblue')
console.log('global color', this.color) // lightblue
console.log('var color', color) // lightyellow
console.log('object literal ---------------------')
const person={
  name: 'pavan',
  regFn: function(){
    console.log('object literal reg function', this) // object literal
  },
  arrFn: ()=>{
    console.log('object literal arrow function', this) // from `this` or module.exports.color i.e. lightblue
  }
}
person.regFn()
person.arrFn()

#########################
Not important: Above Example (in browser console-dev tools- 'use strict')
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
