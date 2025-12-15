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
difference between null and undefined javascript
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/693c1f08-c6b4-8324-9853-e19bbdda59c2

undefined: A variable is declared but not assigned any value
default value for uninitialized variables, missing function args, missing object properties

typeof undefined=undefined

undefined cases:
let a;
console.log(a); // undefined

function test(x) {
  console.log(x);
}
test(); // undefined

let obj = {};
console.log(obj.value); // undefined

null:
A variable is explicitly assigned to represent "no value" and must be explicitly assigned by the developer

typeof null=object

null cases:
let user = null;  // user intentionally has no value
console.log(user); // null

function getUser() {
  return null; // means “no user found”
}

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

bracket notation can be used when property has - in it or need to use another variable
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
console.log("5"-2) // converts 5 to number

Number coercion:
console.log("10"-2) //8
console.log("10"*"2") // 20
console.log("10"/"2") // 5

Boolean coercion:
Falsy values:
false, 0, "", null, undefined, NaN
Example:
if ("hello") {
  console.log("true");
}
Non-empty string → coerced to true.

Typical interview examples:
console.log(null == undefined) // true
console.log("5" == 5) // true
console.log("5.0" === 5.0) // false
console.log([] == 0) // true, because [] -> "" -> 0
console.log(true+1) // tru -> 1


var msg = "Hello JS";
console.log(msg);
console.log("not a number" / 2); //NaN
console.log("not a number" / 2 + 5); // NaN

console.log(typeof Symbol("id")); //symbol
console.log(typeof "foo"); //string
console.log(typeof Infinity); //number
console.log(typeof (typeof 223)) //string

console.log(typeof null); // For null returns "object"–this is an error in the language, it’s not actually an object.
console.log(typeof undefined); // undefined
console.log(null === undefined); // false
console.log(null == undefined); // undefined and null are equal in value

var y = new Number(123); // js number can be object too
console.log("typeof y" + typeof y);
console.log(typeof Math); //object
console.log(typeof [1, 2, 3, 3]); //typeof array=object
####################
5 == '5.0' // results true as 5.0 is converted to 5
5 === '5.0' // results false i.e. strict equality
####################
typeof NaN is a number
It represents undefined or unrepresentable numeric results
Examples:
  0 / 0          // NaN
  Math.sqrt(-1)  // NaN
  parseInt("x")  // NaN

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
typeof Infinity // "number"
typeof NaN      // "number"

Why this confuses people
Because:
NaN !== NaN // true 😄

This happens because:
NaN is not equal to anything, including itself
This is also defined by IEEE-754
So JavaScript gives you:
Number.isNaN(value) // ✅ correct check
NOT:
value === NaN       // ❌ always false
