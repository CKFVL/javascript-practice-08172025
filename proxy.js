https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/694e6c1f-e9dc-8324-9832-831fff89ca0e

understanding summary:
- intercepts and customize operations performed on objects and functions
- get, set, has, deleteProperty, apply
Think of it as a middleman / guard / interceptor around an object.

################
Proxy in JavaScript

A Proxy in JavaScript lets you intercept and customize operations performed on objects or functions—such as reading properties, writing properties, calling functions, deleting keys, etc.

Think of it as a middleman / guard / interceptor around an object.

1️⃣ Basic Syntax
const proxy = new Proxy(target, handler);


target → the original object or function

handler → an object with traps (methods that intercept operations)

2️⃣ Simple Example – Intercept get
const user = {
  name: "Pavan",
  age: 40
};

const proxyUser = new Proxy(user, {
  get(target, prop) {
    console.log(`Accessing property: ${prop}`);
    return target[prop];
  }
});

console.log(proxyUser.name);
// Accessing property: name
// Pavan


👉 Every property access goes through the get trap.

3️⃣ Intercept set (Validation Example)
const employee = {};

const proxyEmployee = new Proxy(employee, {
  set(target, prop, value) {
    if (prop === "age" && value < 18) {
      throw new Error("Age must be 18+");
    }
    target[prop] = value;
    return true; // mandatory
  }
});

proxyEmployee.age = 25;   // ✅
proxyEmployee.age = 15;   // ❌ Error

4️⃣ has Trap (in operator)
const obj = { secret: "123" };

const proxy = new Proxy(obj, {
  has(target, prop) {
    if (prop === "secret") return false;
    return prop in target;
  }
});

console.log("secret" in proxy); // false

5️⃣ deleteProperty Trap
const data = { id: 1, temp: true };

const proxy = new Proxy(data, {
  deleteProperty(target, prop) {
    if (prop === "id") {
      throw new Error("Cannot delete id");
    }
    delete target[prop];
    return true;
  }
});

delete proxy.temp; // OK
delete proxy.id;   // Error

6️⃣ Function Proxy (apply trap)
function add(a, b) {
  return a + b;
}

const proxyAdd = new Proxy(add, {
  apply(target, thisArg, args) {
    console.log("Arguments:", args);
    return target(...args) * 2;
  }
});

console.log(proxyAdd(2, 3)); // 10

7️⃣ Real-World Use Cases (Interview ⭐)
🔹 Validation

Enforce property rules

Type checks

🔹 Logging & Debugging

Track object access

Performance metrics

🔹 Reactive Systems

Used internally by Vue 3

State tracking

🔹 Access Control
const secure = new Proxy(obj, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Private property");
    }
    return target[prop];
  }
});

🔹 Default Values
const withDefaults = new Proxy({}, {
  get(target, prop) {
    return prop in target ? target[prop] : "N/A";
  }
});

8️⃣ Proxy vs Object.defineProperty
Feature	                  Proxy	          defineProperty
Intercepts all ops	      ✅	              ❌
Works with dynamic keys	  ✅	              ❌
Array & function support	✅	              ❌
Performance	              Slightly slower	Faster

9️⃣ Important Rules ⚠️
Proxy does not clone the object
Always return true in set
Cannot proxy primitive values directly
Revocable proxies exist (Proxy.revocable)

10️⃣ One-Line Interview Definition
A Proxy allows you to intercept and redefine fundamental operations on JavaScript objects or functions using handler traps.