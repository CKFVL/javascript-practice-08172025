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
