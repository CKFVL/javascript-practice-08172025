JavaScript is weakly typed (allows implicit type coercion)
let a=6
let b='2'
const res=a/b // results=3 (javascript is weak type language i.e., the type is associated with run-time values)

If you want stronger typing, Use TypeScript, which adds compile-time type checking
Edge cases
'2' (a numeric string) → coerced to number
'2a' → NaN
'' → 0
' 4 ' → 4 (whitespace is ignored)

If you want to avoid implicit coercion, convert explicitly:
const res = a / Number(b);
#########################
JavaScript is dynamically typed (types decided at runtime)
while typescript is static type language.

Variable types are determined at runtime, not before the program runs.
You can change a variable’s type anytime:

let x = 10;    // number
x = "hello";   // now it's a string
x = true;      // now it's a boolean

JavaScript allows this because it does not enforce type declarations.



