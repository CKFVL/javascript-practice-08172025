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


