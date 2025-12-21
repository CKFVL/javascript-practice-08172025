Environment	              Mode	          Global this (top-level)	           Function this (non-method)
Browser	                  Non-strict	    window(refers to global object)	      window
(scripts, not modules)    Strict	        undefined	                          undefined
Node.js	                  Non-strict	    module.exports(initially {})	      global
                          Strict	        module.exports(initially {})	      undefined

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
'use strict'
console.log(this) // nodejs: {}
this.color = "qwewq" // nodejs: {color:qwewq}
console.log("global scope: " + this.color) // qwewq

var color = "sdsdf" // nodejs:color
console.log("var scope: " + color)

let Car = function (_color) {
    this.color = _color; // purple
    color = _color; // assigns to global var 'color'
}

let car = new Car('purple');
console.log(car.color) // purple

console.log("global scope again: " + this.color) // qwewq
console.log("var scope again: " + color) // purple

// function (non-method)
function testThis(){
  console.log(this)
}
testThis()

Output ('use strict')
---------
{}
global scope: qwewq
var scope: sdsdf
purple
global scope again: qwewq
var scope again: purple
undefined

Output (not strict mode)
---------
Output:
{}
global scope: qwewq
var scope: sdsdf
purple
global scope again: qwewq
var scope again: purple
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

#########################
Above Example (in browser console-dev tools- 'use strict')
(this equals window object)
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
global scope: qwewq
var scope: sdsdf
purple
global scope again: purple
var scope again: purple
undefined

(in browser console-dev tools- 'non strict mode')
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
VM98:4 global scope: qwewq
VM98:7 var scope: sdsdf
VM98:15 purple
VM98:17 global scope again: purple
VM98:18 var scope again: purple
VM98:22 Window {window: Window, self: Window, document: document, name: '', location: Location, …}


