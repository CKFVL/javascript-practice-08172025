falsy values: false, 0, '', NaN, Undefined, null [any value other than this is truthy]
e.g.
  cartQuantity=0
  if(cartQuantity){ // falsy
    console.log("cart quantity:"+cartQuantity)
  }

  cartQuantity=5
  if(cartQuantity){ // truthy
    console.log("cart quantity:"+cartQuantity)
  }

----
and (&&) operator: returns first falsy value or last value (short-circuit)

console.log(true && 1 && "yes" && null && "done"); // null

let variable1=5 && "hello"
console.log(variable1) // prints hello

let variable1=false && "hello"
console.log(variable1) // prints false

----
OR Operator: returns the first truthy value
console.log(false || 0 || "" || "hello" || 42); // "hello"
false, 0, "" are falsy values

Used commonly for default values:
let userType= <input> || "GUEST" // value will be GUEST if input is undefined

----
  BOTH && and || operators return actual values not just true/false
  console.log("A" && "B") // both truthy and prints B
  console.log("A" || "B") // first truthy and prints A.
----
Guard operator or "nullish coalescing" operator (??):
  Returns right-hand side if Left is null or undefined only
  
  let value = 0;
  console.log(value || 10); // ➡️ 10 (because 0 is falsy)
  console.log(value ?? 10); // ➡️ 0  (because 0 is NOT null/undefined)

  let username = null;
  console.log(username || "Guest"); // ➡️ "Guest"
  console.log(username ?? "Guest"); // ➡️ "Guest"

  Why is ?? called a "guard" sometimes?
  It guards against null or undefined, but does not block 0, false, or empty string, which are still valid data in many cases.

  let config = {
    retries: 0,
  };

  // Defaults using ||
  let maxRetries1 = config.retries || 3;   // ❌ 3 (bad default — 0 is overwritten)
  let maxRetries2 = config.retries ?? 3;   // ✅ 0 (good default — only null/undefined are replaced)
----
// find out if an expression (or a variable) is true
console.log(Boolean(10 > 9)); // true

// everything with a value is true
console.log(Boolean(100));
console.log(Boolean(3.14));
console.log(Boolean(-15));
console.log(Boolean("Hello"));
console.log(Boolean("false"));
console.log(Boolean(1 + 7 + 3.14));

// everything without a value is false
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(false));
console.log(Boolean(NaN));

// boolean object
var x = true;
var y = new Boolean(true);
console.log(typeof x); // boolean
console.log(typeof y); // object

