Multiple ways to check whether a property exists on an object:
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/69467679-df8c-8322-9408-8493c2bfe29f
Understanding summary:
in -> checks prototype chain
Object.keys/getOwnPropertyNames: enumerable only
Object.hasOwnProperty -> checks in object itself
undefined checks -> unreliable (do not depend)
freeze/seal doesn't remove properties
##################################
1️⃣ in operator (own + inherited properties)
const obj = { name: "pavan" };
console.log("name" in obj);   // true
console.log("toString" in obj); // true (inherited from Object.prototype)

✅ Use when
You want to know if the property exists anywhere in the prototype chain
❌ Avoid when
You only care about the object’s own properties

##################################
2️⃣ hasOwnProperty() (own properties only)
const obj = { name: "pavan" };
console.log(obj.hasOwnProperty("name"));     // true
console.log(obj.hasOwnProperty("toString")); // false

✅ Use when
You want to check only the object’s own properties
⚠️ Gotcha
Can be overridden or missing:
const obj = Object.create(null);
obj.name = "pavan";
obj.hasOwnProperty("name"); // ❌ TypeError

✅ Safe version (recommended)
Object.prototype.hasOwnProperty.call(obj, "name");
AAnother example:
const obj = {
  hasOwnProperty: () => false,
  name: "pavan"
};

console.log(obj.hasOwnProperty("name")); // false
Fix:
Object.prototype.hasOwnProperty.call(obj, "name"); // true, so Never trust obj.hasOwnProperty() directly.
##################################
Object.getOwnPropertyDescriptor()

Object.getOwnPropertyDescriptor(obj, prop)
➡️ Returns metadata about an own property of an object.
It tells you:
Does the property exist?
Is it writable?
Is it enumerable?
Is it configurable?
What is its value OR getter/setter?

“Object.getOwnPropertyDescriptor() is the only API that tells me both whether a property exists and how it behaves.”
More at
https://github.com/CKFVL/javascript-practice-08172025/blob/main/ObjectGetOwnPropertyDescriptor.js
##################################
Object.create(null)
const obj = Object.create(null);
obj.a = 10;

console.log("a" in obj);             // true (because checks in prototype chain)
console.log(obj.hasOwnProperty("a"));// TypeError

##################################
Object.hasOwn() (ES2022+ ✅ BEST MODERN WAY)
const obj = { name: "pavan" };
console.log(Object.hasOwn(obj, "name")); // true
console.log(Object.hasOwn(obj, "toString")); // false

✅ Why this is best
No prototype issues
No overrides
Works with Object.create(null)
Cleaner than .call()
👉 Preferred in modern JavaScript

##################################
Object.freeze() (❌ Trap: removes properties -> No)
const obj = Object.freeze({ a: 1 });

console.log("a" in obj);        // true
console.log(obj.hasOwnProperty("a")); // true

##################################
Non-enumerable property
const obj = {};
Object.defineProperty(obj, "secret", {
  value: 42,
  enumerable: false
});

console.log("secret" in obj);              // true
console.log(Object.keys(obj).includes("secret")); // false because Object.keys() checks enumerability, not existence.

##################################
Optional chaining confusion: Optional chaining does not check existence.
const obj = { a: undefined };

console.log(obj?.a);        // undefined
console.log("a" in obj);    // true
##################################
Delete vs undefined
const obj = { a: 1 };

obj.a = undefined;
console.log("a" in obj); // true (property still exists)

delete obj.a;
console.log("a" in obj); // false

