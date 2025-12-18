JavaScript is dynamically typed (types decided at runtime)
while typescript is static type language.

Variable types are determined at runtime, not before the program runs.
You can change a variable’s type anytime:

let x = 10;    // number
x = "hello";   // now it's a string
x = true;      // now it's a boolean

JavaScript allows this because it does not enforce type declarations.
##########################
JavaScript is weakly typed (allows implicit type coercion=javascript automatically changes the type for you)
let a=6
let b='2'
const res=a/b // results=3 (javascript is weak type language i.e., the type is associated with run-time values)

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
console.log(null === undefined) // false
console.log("5" == 5) // true
console.log("5" === 5) // false (strict equality ie., compare both identity and values)
console.log("5.0" === 5.0) // false
console.log([] == 0) // true, because [] -> "" -> 0
console.log(true+1) // tru -> 1

If you want stronger typing, Use TypeScript, which adds compile-time type checking
Edge cases
'2' (a numeric string) → coerced to number
'2a' → NaN
'' → 0
' 4 ' → 4 (whitespace is ignored)

If you want to avoid implicit coercion, convert explicitly:
const res = a / Number(b);
#########################



