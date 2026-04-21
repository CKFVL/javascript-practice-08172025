console.log(foo)
foo=1 // output : ??
#######################
console.log(foo)
var foo=2 // output : ??
#######################
foo=3
console.log(foo)
var foo // output : ??
#######################
console.log("value of age is", age)
var age=30
console.log("value of age is", age)

Output:
??

###############
age=100
console.log("value of age is", age)
var age=30
console.log("value of age is", age)

Output:
??

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
??

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
??

##################
console.log(foo)
foo=1 // output : ??

console.log(foo)
var foo=2 // output : ??

foo=3
console.log(foo)
var foo // output : ??