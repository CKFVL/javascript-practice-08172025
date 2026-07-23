Understanding summary:
---------------------
  - writable=true: can change value
  - enumerable=true: Property participates in common property enumeration (shows in loops or for...in or Object.keys(obj))
  - configurable=true: can delete or redefine

  *** defaults are true

  properties created normally are enumerable by default:
    const obj = {
      name: "Pavan"
    };

    console.log(
      Object.getOwnPropertyDescriptor(obj, "name").enumerable
    ); // true

  Whereas Object.defineProperty() defaults enumerable to false if you omit it:
    Object.defineProperty(obj, "secret", {
      value: 123
    });

    console.log(
      Object.getOwnPropertyDescriptor(obj, "secret").enumerable
    ); // false

  When a property has:
    configurable: false
  You cannot change its descriptor anymore — meaning you cannot change:
    configurable
    enumerable
    convert data property ↔ accessor property
    change get / set
  except, from writable: true to writable: false (to keep more safe)

  Refer line 385
#############################################################################
let newEmployee1 = {id:22, name: 'pavan', age: 34};
let newEmployee2 = {id:23, name: 'bhogala', age: 34};
let newEmployee3 = {id:24, name: 'vani', age: 41};

let empArr=[newEmployee1, newEmployee2, newEmployee3];
for(const emp of empArr){
  console.log(emp.name)
  console.log(emp.age)
}
console.log('$$$$$$$$$$$$$$$$$$')
// enumerbale method
for(const emp in empArr){ // for...in iterates over indexes (keys), not the actual objects.
  console.log(emp)
  console.log(empArr[emp].name)
  console.log(empArr[emp].age)
}
// //Object.defineProperty(newEmployee1, 'name', {configurable:false, writable: true}) - throws error--Cannot redefine property: name

What defineProperty controls
It controls:
| Attribute    | Meaning                |
| ------------ | ---------------------- |
| value        | actual value           |
| writable     | can change value       |
| enumerable   | shows in loops         |
| configurable | can delete or redefine |

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/699d0a1a-2478-8323-87b3-a03ce8d55830
In JavaScript, Object.defineProperty() lets you control property descriptors:
  writable → Can the value be changed?
  enumerable → Will it show up in loops like for...in or Object.keys() or console?
  configurable → Can the property be deleted or reconfigured?

// If writable: false, the value cannot be changed.
Object.defineProperty(newEmployee1, 'name', {writable: false})
//Without strict mode → fails silently.
newEmployee1.name='guru'
// 'use strict'
// ❌ TypeError in strict mode; TypeError: Cannot assign to read only property 'name' of object '#<Object>'
//newEmployee1.name='newName'
---
enumerable: false means the property exists and can still be accessed, but it is hidden from many property-enumeration operations.
(the property won’t appear in loops or Object.keys())

  https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6a564a2d-9468-83ee-b220-01c8c2a5a059
  | Operation                      | Does `"name"` appear?  |
  | ------------------------------ | ---------------------  |
  | Direct access: `obj.name`      | ✅                     |
  | `"name" in obj`                | ✅                     |
  | `Object.hasOwn(obj, "name")`   | ✅                     |
  | `for...in`                     | ❌                     |
  | `Object.keys()`                | ❌                     |
  | `Object.values()`              | ❌                     |
  | `Object.entries()`             | ❌                     |
  | `{...obj}`                     | ❌                     |
  | `Object.assign({}, obj)`       | ❌                     |
  | `JSON.stringify(obj)`          | ❌                     |
  | `Object.getOwnPropertyNames()` | ✅                     |
  | `Reflect.ownKeys()`            | ✅                     |

const user = {};

Object.defineProperty(user, "age", {
  value: 34,
  enumerable: false
});

console.log(Object.keys(user)); 
// []  (age is hidden)

for (let key in user) {
  console.log(key);  // Nothing printed
}

console.log(user.age); 
// 34 (still accessible directly)

Important: for...of
  for...of does not enumerate normal object properties at all:
    for (const value of obj) {
      // TypeError: obj is not iterable
    }
Simple mental model:
    enumerable: true
        ↓
    Property participates in common property enumeration

    enumerable: false
        ↓
    Property still exists
    Property can still be accessed
    But common enumeration/copying operations hide it

*** Also, properties created normally are enumerable by default:
    const obj = {
      name: "Pavan"
    };

    console.log(
      Object.getOwnPropertyDescriptor(obj, "name").enumerable
    );// true

*** Whereas Object.defineProperty() defaults enumerable to false if you omit it:
    Object.defineProperty(obj, "secret", {
      value: 123
    });

    console.log(
      Object.getOwnPropertyDescriptor(obj, "secret").enumerable
    ); // false
---
//configurable
If configurable: false, you cannot:
  - Delete the property
  - Change its descriptor (except writable → false)

👉 Once configurable is false, it’s locked.

const user = {};

Object.defineProperty(user, "id", {
  value: 101,
  configurable: false,
  enumerable: true // without this, property won't show up in loops like for...in or Object.keys() or console
});
console.log('user:',user)
// TypeError: Cannot delete property 'id'
// delete user.id

// cannot redefine property
// TypeError: Cannot redefine property: id
Object.defineProperty(user, "id", {configurable: true})

--> Change its descriptor (except writable → false)
When a property has:
  configurable: false
You cannot change its descriptor anymore — meaning you cannot change:
  configurable
  enumerable
  convert data property ↔ accessor property
  change get / set

BUT there is one special exception:
  If writable: true, you are allowed to change it to false.

You can only move in one direction:
  writable: true  →  writable: false ✅
  writable: false →  writable: true ❌ (not allowed)

Example 1 — Allowed Change (writable → false)
  const obj = {};
  Object.defineProperty(obj, "name", {
    value: "Pavan",
    writable: true,
    configurable: false
  });

  // This is allowed
  Object.defineProperty(obj, "name", {
    writable: false
  });

  obj.name = "New Name";
  console.log(obj.name); // Pavan (cannot change anymore)

This works because we changed writable from true to false.

🔎 Example 2 — Not Allowed (false → true)
  Object.defineProperty(obj, "name", {
    writable: true
  });

  ❌ TypeError: Cannot redefine property
  Once configurable: false, you cannot change it back.


Example 3 — Cannot Change enumerable
const obj = {};
Object.defineProperty(obj, "age", {
  value: 34,
  enumerable: true,
  configurable: false
});

// Try changing enumerable
Object.defineProperty(obj, "age", {
  enumerable: false
});

❌ TypeError
You cannot change enumerable when configurable is false.


Example 4 — Cannot Convert to Getter/Setter
const obj = {};
Object.defineProperty(obj, "salary", {
  value: 50000,
  writable: true,
  configurable: false
});

// Try converting to accessor property
Object.defineProperty(obj, "salary", {
  get() {
    return 100000;
  }
});

❌ TypeError
Because converting between:

Data property → Accessor property is not allowed when configurable: false.

🧠 Why JavaScript Allows writable → false?
Because making something more restrictive is safe.
But making it less restrictive (like turning writable back to true) could break guarantees.
So JavaScript only allows tightening, never loosening.
---
// When redefining an existing property, 
// if you omit value, it keeps the existing value, but it's better practice to include all attributes explicitly.
Object.defineProperty(newEmployee1, 'name', {configurable:true, value:'gurupavan'})
console.log(newEmployee1)

// for new property, the value will be undefined
let newEmployee4={id:25, name: 'Nihitha', age: 44}
Object.defineProperty(newEmployee4, 'phone', {})

---
Example:
'use strict'
const employee={}

Object.defineProperty(employee, 'name', 
{value:'bhogala gurupavan', 
configurable: false, 
enumerable: false, 
writable: false})

console.log(employee)

// strict mode -> TypeError: Cannot assign to read only property 'name' of object '#<Object>'
employee.name='kumar' //
console.log(employee) // non-strict mode -> same value= { name: 'bhogala gurupavan' } -> 


console.log(Object.keys(employee)) // won't show up in loops or console or Object.keys

// delete property: typeerror
// delete employee.id

// redefine property: TypeError: Cannot assign to read only property 'name'
// Object.defineProperty(employee, 'name', {value:'kumar', enumerable:true})
// Object.defineProperty(employee, 'name', {value:'reddy', writable:true})

---
🧠 Default Values

If you don’t specify them:
Object.defineProperty(obj, "prop", { value: 10 });

Defaults are:
{
  writable: false,
  enumerable: false,
  configurable: false
}

⚠️ This is different from normal object properties:

const obj = { prop: 10 };
Defaults here are:
{
  writable: true,
  enumerable: true,
  configurable: true
}
###############################################
const obj = {};
Object.defineProperty(obj, "secret", {
  value: 42,
  enumerable: false
});

console.log("secret" in obj);              // true
console.log(Object.keys(obj).includes("secret")); // false because Object.keys() checks enumerability, not existence.