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
  -  var declarations (hoisted but not their assignments)
      var myFunc = function() { ... }
      *** hoisted as
      var myFunc; // value = undefined
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

