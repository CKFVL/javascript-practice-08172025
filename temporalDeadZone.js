TDZ is the time between entering a scope and the moment a let or const variable is declared, during which accessing that variable throws a ReferenceError.
Key point: You cannot access a let or const variable before its declaration — even to assign it.
TDZ is block-scoped, not function-scoped.
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6940cc19-77ec-8323-bc1f-6c13bbae2226
understanding summary:
---------------------
  -  TDZ applies to let and const
  -  variables are hoisted but uninitialized
  -  accessing them before declaration: ReferenceError
  -  TDZ exists to catch early bugs

#####################
{
  // TDZ starts here
  // age exists in memory but is *uninitialized*

  console.log(age); // ❌ ReferenceError
  let age = 30;     // TDZ ends here
}
Even though age is hoisted, it cannot be accessed until the declaration line is executed.
---
Compare with var
console.log(x); // ✅ undefined
var x = 10;
Why?
var is hoisted and initialized to undefined
let/const are hoisted but NOT initialized → TDZ
---
Common interview trick
let a = 10;

function test() {
  console.log(a); // ❌ ReferenceError (not 10!)
  let a = 20;
}

test();


Why?

a inside test shadows the outer a

Inner a is in TDZ until let a = 20 runs
###########################
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6940ca43-4310-8324-84c1-e4db266fe357
