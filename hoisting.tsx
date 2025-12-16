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
