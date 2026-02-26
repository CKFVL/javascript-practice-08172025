Refer thisInDifferentEnvironment.js to understand the value of `this` in different environments
######################################

// rule of thumb:
// this : object that is executing the current function
// if a function is a method in an Object, this refers to object itself
// if a function is regular function i.e., not inside an object, this refers to global object
    //refer: thisInDifferentEnvironment.js
// if a function is constructor function and is created using new operator, then this refers to arguments to it in new {} object

###########################
previous understanding which is not required now to read this, so ignore to read this page
understanding thisInDifferentEnvironment is enough
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6933f8b8-f69c-8324-9029-58957892ed3c
'use strict'
this.color = "qwewq"
console.log("test global scope" + this.color)

var color = "sdsdf"

let Car = function (_color) {
    this.color = _color;
    color = _color;
}

let car = new Car('purple');
console.log(car.color)

console.log("test global scope" + this.color)
console.log("test global scope" + color)

In browser:
-----------
test global scopeqwewq     // first console.log
purple                     // car.color
test global scopepurple      // this.color
test global scopepurple      // global variable 'color'

In Node.js
----------
test global scopeqwewq
purple
test global scopeqwewq
test global scopepurple

explanation:
🚨 1. 'use strict' changes this in global scope
In strict mode, inside a function this becomes undefined.
But in the top-level global scope of a module or script:
In browser (script) → this = window
In strict mode browser console → STILL window
In Node.js → this = {} (empty object)
You are likely running this in a browser, so:
this.color = "qwewq"
adds a property to window.color.

🚨 2. var color = "sdsdf" creates a global variable AND attaches to window

In browsers:
var color = "sdsdf"
→ also creates window.color = "sdsdf", overriding your earlier value "qwewq".

So the sequence becomes:

Step	Action	Result
this.color = "qwewq"	sets window.color = "qwewq"	color = "qwewq"
var color = "sdsdf"	replaces window.color	color = "sdsdf"

🚗 3. Inside constructor Car
this.color = _color;   // sets car.color = "purple"
color = _color;        // assigns to global var 'color'


Since color exists globally (via var color):

color = _color modifies global variable → window.color

So after:

new Car("purple")
you get:
car.color = "purple"
window.color = "purple"

🔥 Final Explanation Summary
In global scope, this refers to window (in browsers), even in strict mode.
var color attaches to the global object.
Your constructor sets:
this.color → car.color
color → global variable → window.color
So global this.color and local car.color both end up "purple".

---
*** In Node.js, strict mode or not, the top-level this behaves differently.

//'use strict'
// In Node global scope:
// this = {} (module.exports)
// So it sets:
// module.exports.color = "qwewq"
this.color = "qwewq"
console.log("test global scope" + this.color) // qwewq

// var in Node adds to global
// → global.color = "sdsdf"
var color = "sdsdf" // hoisted


let Car = function (_color) {
    this.color = _color; // / car.color = "purple"
    color = _color; // modifies the global variable 'color'
}

let car = new Car('purple');
console.log(car.color) // purple

console.log("test global scope" + this.color) // qwewq
console.log("test global scope" + color) // purple

👉 In Node.js top-level this IS NOT global
this is an empty object ({})
NOT global
So:
this.color = "qwewq";

creates a property ON THAT EMPTY OBJECT, NOT GLOBAL.
Meanwhile:
var color = "sdsdf";

Still becomes a global variable (global.color).
So:
this.color = "qwewq"
and
color = "purple"

modify two different things.
🔍 Let’s break down Node.js behavior
1. this.color = "qwewq"
In Node global scope:
this = {} (module.exports)
So it sets:
module.exports.color = "qwewq"

2. var color = "sdsdf"
var in Node adds to global
→ global.color = "sdsdf"

3. Inside constructor:
this.color = _color;   // car.color = "purple"
color = _color;        // modifies the global variable 'color'

So:
global.color = "purple"
But this.color at top level was set on a different object, so it stays "qwewq".

🎉 Final Explanation for Your Exact Output
What?	this.color	global color
After this.color = "qwewq"	"qwewq"	(none yet)
After var color = "sdsdf"	"qwewq"	"sdsdf"
After new Car("purple")	"qwewq" (unchanged)	"purple"

Hence output:

test global scopeqwewq
purple
test global scopeqwewq
test global scopepurple

🚀 Want Proof?
Run these in Node:
console.log("this === global ?", this === global);
console.log("this:", this);

You’ll see:
this === global ? false
this: {}

✅ Summary
In Node.js:

this (top-level) → module.exports object (NOT global object)
var x → attaches to global i.e. window
Arrow functions still capture lexical this, but that’s separate

