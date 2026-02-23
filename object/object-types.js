variable identifier rules:

must not contain whitepace or special characters

may contain numbers but not start with a number

must not clash with reserved keywords

######################

Primitive types:
----------------
String
boolean
number: javascript doesn't have special runtime value for integers, so there's no equivalent to int or float, so everything is Number
undefined
null
symbol

Reference types:
----------------
Object
Array
Function

###################
dot notation on object:
let person={
  name: 'pavan',
  age: 40
}

// dot notation
person.name='guru'

// bracket notation
person['name']='guru'

bracket notation can be used when property has - in it or need to use another variable/computed property
e.g.
let newName='bhogala'
person[newName]='kumar'

####################
1. Strongly vs Weakly Typed
This is about how strictly types are enforced:
Strongly typed → No implicit, unsafe type coercions. Types must match or be converted explicitly.
Weakly typed → The runtime/compiler allows mixing types and often coerces automatically.

🔹 2. Statically vs Dynamically Typed
This is about when types are checked:
Statically typed → Types are checked at compile time (before running).
Dynamically typed → Types are checked at runtime (while running).

let a=6
let b='2'
const res=a/b // results=3 (javascript is dynamic type language i.e., the type is associated with run-time values)

but typescript is static type language 

Putting it together
Language	        Strong/Weak	      Static/Dynamic	Example Behavior
Java	            Strong	          Static	        Compiler enforces types before running.
TypeScript	      Strong	          Static	        Type errors at compile time, JS output at runtime.
Python	          Strong	          Dynamic	        You can’t add "5" + 2 (error), but types are checked at runtime.
JavaScript	      Weak	            Dynamic	        "5" + 2 → "52" (automatic coercion).
C	                Weak	            Static	        Implicit casts allowed (e.g., int to char) at compile time.
####################
String coercion:
console.log("5"-2)

Number coercion:
  console.log("10"-2) 
  console.log("10"*"2") 
  console.log("10"/"2")

Boolean coercion:
Falsy values:
false, 0, "", null, undefined, NaN
Example:
if ("hello") {
  console.log("true");
}
Non-empty string → coerced to true.

Typical interview examples:
console.log(null == undefined)
console.log("5" == 5)
console.log("5.0" === 5.0)
console.log([] == 0)
console.log(true+1)


var msg = "Hello JS";
console.log(msg);
console.log("not a number" / 2);
console.log("not a number" / 2 + 5);

console.log(typeof Symbol("id"));
console.log(typeof "foo");
console.log(typeof Infinity);
console.log(typeof (typeof 223))

console.log(typeof null); // For null returns "object"–this is an error in the language, it’s not actually an object.
console.log(typeof undefined);
console.log(null === undefined);
console.log(null == undefined);

var y = new Number(123);
console.log("typeof y" + typeof y);
console.log(typeof Math);
console.log(typeof [1, 2, 3, 3]);
####################
5 == '5.0'
5 === '5.0'
####################
typeof NaN is a number
It represents undefined or unrepresentable numeric results
Examples:
  0 / 0          
  Math.sqrt(-1)  
  parseInt("x")  

Why not a separate type?
JavaScript has only one numeric type:
Number

It includes:
Integers → 1
Floating points → 3.14
Special values:
  Infinity
  -Infinity
  NaN

So:
typeof Infinity 
typeof NaN      

Why this confuses people
Because:
NaN !== NaN 

This happens because:
*** NaN is only javascript type that is not equal to anything- including itself

so, 
NaN == NaN      
NaN === NaN    
Object.is(NaN, NaN) 

So JavaScript gives you:
Number.isNaN(value) 
NOT:
value === NaN       
-------
console.log(1 < 2 < 3) --> true
1 < 2 --> true
true < 3 --> true (bcoz Booleans get coerced to numbers in comparisons, here true is coerced to 1)

Fix: console.log(1 < 2 && 2 < 3)
---
console.log(3 > 2 > 1)
3 > 2 --> false
false > 1 --> false (bcoz Booleans get coerced to numbers in comparisons, here false is coerced to 9)
Fix: console.log(3 > 2 && 2 > 1)

---
function getAge(...args){
  console.log(typeof args)
}

getAge(12)

---
function sayHi(){
  return (()=>0)()
}

console.log(typeof sayHi())
console.log(sayHi())

---
function sayHi(){
  return ()=>0
}

console.log(typeof sayHi()())

---
console.log(typeof typeof 1)

---
let data=[1,2,3].map(num =>{
  if(typeof num === 'number') return;
  return num*2
})

console.log(data)

---
const a=[undefined]
const b={'a':1}

console.log(a[0]===b[0])