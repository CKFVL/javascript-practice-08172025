javascript.js
strict.js
string
order of operations
ExpressionBodyAndBlock.js
boolean.js
###############################################################
function: args Vs parameters
    function sum(a,b,c){ // Parameters (function definition): These are the variables listed when you define a function.
      return a+b+c
    }

    const nums=[1,2,3]
    console.log(sum(...nums)) // args

  Parameters (function definition): These are the variables listed when you define a function.
    function sum(...nums){
      return numbers.reduce((a,b)=>a+b,0)
    }
  
    console.log(sum(1,2,3))
###############################################################
  function (regular)
  constructor function
  factoryFunction.js
  diff b/w constructor and factory (diff-bw-factory-constructor-fn.js)
  arrowFunction.js (refer this folder to understand how this works in browser, constructor function, regular function and arrow function)
  HOF.js
  function composition
  currying
###############################################################
forloop.js
stringify.js
tdz (temporalDeadZone.js)
hoisting.tsx
###############################################################
  this folder (to understand how this works in browser, constructor function, regular function and arrow function)
    - masterflow.js
    - this_var.js
    - thisInDifferentEnvironment.js
    - this_new
    - this_regular_function_new.js
    - this_arrow_function_new.js
    - this-literal.js
    - this_examples_new.js

  // rule of thumb:
    // this : object that is executing the current function
    // if a function is a method in an Object ({}), this refers to object itself
    // if a function is regular function i.e., not inside an object, this refers to global object
        //refer: thisInDifferentEnvironment.js
    // if a function is constructor function and is created using new operator, then this refers to arguments to it in new {} object

  ObjectPropertiesScope.js (important) 
    go through correct ways of creating functions to avoid scope issue with this in browser or nodejs or regular functions
      way #1 — use new + regular method
      way #2 — arrow function
      way #3 — modern class (best)
      way #4 — Return an object (factory pattern)
      
  ObjectLiteralVsJSON.js
  ObjectPropertyExistence.js
  object.create(null).js
  ObjectGetOwnPropertyDescriptors.js
###############################################################
object (folder)
  1_+coercion-rules, 2booleanConversion, 3==coercion-rules, 4stringCoercion, 5NumberCoercion, rules.js, 
  null vs undefined
  object types
  object properties
  object-propert-descriptors.js
  object-prototype.js
  object destructuring
###############################################################
iterable.js (GeneratorFunction.js)
rest-spread.js
ObjectAssignVsSpread.js
---
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a683a38-ccc0-83ee-affc-4fc50b0f88cf
call, apply and bind (callVsApplyVsBind.js)
---
promise
async await
---
es6 class
inheritance
---
event loop
callbackstarvation
tail recursion
####################
browserObjects.js
####################
array (folder)
map (folder)
math (folder)
####################
pending.txt
####################
polyfills
https://www.youtube.com/watch?v=Th3rZjfKKhI
####################
document.querySelector('button').innerHTML
document.querySelector('.js-buton').innerHTML
document.querySelector('button').innerText

move js code to script section
block elements like p, div takes up an entire line by itself

getElementById
getElementsByClassName

difference between getElementsByClassName and querySelectorAll
difference between getElementById and querySelector

whenever the value is extracted from HTML element, its awlays a string type.

block level elements

To link another css file in a html, use
<link rel="stylesheet" href="styles/<file-path> >

To link another javascript file in a html, use
<script src="<file-path>"></script>
###################
use Math.max to find to find the highest number in an array
use Math.min to find the smallest number in an array
---
type=module
<script type=module src="scripts/amazon.js">

You got two different types of exports: default (unnamed) and named exports:
default => export default ...;
named => export const someData = ...;
You can import default exports like this:
import someNameOfYourChoice from './path/to/file.js';
Surprisingly, someNameOfYourChoice is totally up to you.
Named exports have to be imported by their name:
import { someData } from './path/to/file.js';
---
to veirfy if property exists
console.log(obj.foo);         // 2
console.log(Object.getOwnPropertyNames(obj)); // ["name", "score", "foo"]
console.log(Object.getOwnPropertyDescriptor(obj, "foo"));
---
redirection
udemy-react-javascript-refresher.js
############
Top5 questions by chatgpt: (for interview prep)
LRU Cache
https://www.youtube.com/watch?v=7_WxOdeCv9k

Global execution context

Task scheduler

Event emitter
https://www.youtube.com/watch?v=Gz8NVkPxOiM&list=PLinedj3B30sDi0keEOQU3n5p3Op28eN2e&index=10

Debounce and throttle
https://www.youtube.com/watch?v=3o47TTtF2u0&list=PLinedj3B30sDi0keEOQU3n5p3Op28eN2e&index=11

############
machine coding