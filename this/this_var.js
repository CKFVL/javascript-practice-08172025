https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a65f898-1440-83ee-bf67-a5a0582cf535

Summary:
-------
    -   Browser classic scripts: var is part of window (and therefore this).
    -   Node.js CommonJS modules: var is not part of this; it's module-local.
    -   ES modules (browser or Node): var is module-scoped and not part of this.

Browser (non-module script)
    A var declared in the global scope becomes a property of the global object (window), so it is accessible via this at the top level.

var x = 10; 
    console.log(window.x); // 10
    console.log(this.x);   // 10
    console.log(this === window); // true

Here:
    Global this → window
    var → window.x

####################################################
Browser (ES Module)
In an ES module:

// app.js
    var x = 10;
    console.log(this); // undefined
    console.log(window.x); // undefined

Here:
    Top-level this is undefined.
    var is module-scoped, not added to window.

####################################################
Node.js (CommonJS module)
Every file is wrapped like this internally:
(function (exports, require, module, __filename, __dirname) {
  // your code
});

So:
var x = 10;
console.log(this);
prints something similar to:
{}
because top-level this is module.exports.

And:
var x = 10;
console.log(this.x);      // undefined
console.log(global.x);    // undefined
var is local to the module, not a property of module.exports or global.

Why this happens:
var creates a property on the global object only when the declaration is in the global execution context.
    Browser classic script → global execution context → window.x
    Browser ES module → module scope → not global
    Node CommonJS → module wrapper function → function scope → not global

Quick comparison:
| Environment            | Top-level `this` | `var x = 10` becomes `this.x`? |
| ---------------------- | ---------------- | ------------------------------ |
| Browser classic script | `window`         | ✅ Yes                          |
| Browser ES module      | `undefined`      | ❌ No                           |
| Node.js CommonJS       | `module.exports` | ❌ No                           |
| Node.js ES module      | `undefined`      | ❌ No                           |
