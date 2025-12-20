Multiple ways to check whether a property exists on an object:
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
