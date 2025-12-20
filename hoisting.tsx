console.log("value of age is", age);
var age=30;

console.log("value of age is", age)
output: undefined, 30
##################
age=100
console.log("value of age is", age)
var age=30
console.log("value of age is", age)
output: 100, 30

##################
age=100
console.log("value of age is", age)
let age=30
console.log("value of age is", age)
Output:
-------
ReferenceError: Cannot access 'age' before initialization
##################
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/6940ca43-4310-8324-84c1-e4db266fe357
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/6940cc19-77ec-8323-bc1f-6c13bbae2226
###################
Hoisting order:
  -  function declarations (hoisted with their body)
      function myFunc() { ... }
  -  var declarations (hoisted but not their assignments i.e. initialized as undefined so calling undefined → TypeError)
      var myFunc = function() { ... }
      *** hoisted as
      var myFunc; // value = undefined
  -  let and const declarations (hoisted but uninitialized (TDZ) and Access before declaration → ReferenceError)
  -  execution

example:
-------
myFunc()
var myFunc = function(){
    console.log("First")
}
myFunc()
function myFunc(){
    console.log("second")
}
myFunc()

What the JS engine actually sees:
After hoisting, your code becomes conceptually:

function myFunc() {
    console.log("second")
}
var myFunc; // does NOT override the function
// Execution starts here
myFunc() // First call: myFunc refers to the function declaration
myFunc = function(){ // Now the function declaration is overwritten by the function expression.
    console.log("First")
}
myFunc() // 
myFunc()
############
var variable=10;

(()=>{
    console.log(variable)
    variable=20;
    
    console.log(variable)
})();

console.log(variable)

var variable=30

Hoisting phase (important)
var declarations are hoisted to the top of their scope and initialized with undefined.
So the engine internally sees this as:
  var variable;   // hoisted (only once)
  variable = 10;
  (() => {
    console.log(variable);
    variable = 20;
    console.log(variable);
  })();
  console.log(variable);
  variable = 30;
##################
variable=10
(() => {
    foo=100;
    console.log(variable)

    var foo=100
    variable=20
    console.log(variable)
})();

console.log(foo)
console.log(variable)
var variable=30

// 10, 100, 20, 
// throws error (foo was declared with var inside the IIFE
// It is NOT accessible outside
// ⛔ Execution stops here
// ➡️ The remaining lines do not run))

############
- arrow function is not hoisted
func2();
console.log(x)

func1();
const func1 = () =>{
    console.log("fun1")
}

function fun2(){
    console.log("fun2")
}

console.log(y)

var x=5;
var y=7;

Output: 
fun2
undefined
  and 
as arrow functions are not hoisted.
ReferenceError: func2 is not defined
    at Object.<anonymous> (/tmp/V8WQ9tdT6F/main.js:1:1)
    at Module._compile (node:internal/modules/cjs/loader:1706:14)
    at Object..js (node:internal/modules/cjs/loader:1839:10)
    at Module.load (node:internal/modules/cjs/loader:1441:32)
    at Function._load (node:internal/modules/cjs/loader:1263:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:171:5)
    at node:internal/main/run_main_module:36:49
