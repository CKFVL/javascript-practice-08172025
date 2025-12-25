console.log("value of age is", age)
var age=30
console.log("value of age is", age)

Output:
undefined
30

###############
age=100
console.log("value of age is", age)
var age=30
console.log("value of age is", age)

Output:
100
30

###############
myFun();

var myFun=function(){
  console.log("First")
}

myFun();

function myFun(){
  console.log("second")
}

myFun();

Output:
------
second
First
First

###############
variablef=10;
(()=>{
  foo=100
  console.log(variablef)
  var foo=100;
  variablef=20
  console.log(variablef)
})();

//console.log(foo)
console.log(variablef)
var variablef=30
console.log(variablef)
// output
// 10
// 20
// ReferenceError: foo is not defined
// 20
// 30