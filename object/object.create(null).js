https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb/c/6a605455-2778-83ee-9806-6ae467153235

This code throws an error. Let's see why.
const obj = Object.create(null);
obj.name = "pavan";
obj.hasOwnProperty("name");

Step 1: Object.create(null)
Normally, objects inherit from Object.prototype.
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

But with:
const obj = Object.create(null);
the object has no prototype.

obj
 ├── name: "pavan"
 └── [[Prototype]] → null

So it does not inherit methods like:

    hasOwnProperty()
    toString()
    valueOf()
    constructor

Step 2: Add a property
obj.name = "pavan";
Now the object looks like:
    {
    name: "pavan"
    }
But its prototype is still null.

Step 3: Call hasOwnProperty
    obj.hasOwnProperty("name");
    JavaScript first tries to find hasOwnProperty.

    obj
    ├── name
    ├── hasOwnProperty ? ❌ Not found
    └── prototype → null

    Since there is no prototype to continue searching, JavaScript gets:
    undefined("name")
    which throws:
    TypeError: obj.hasOwnProperty is not a function

How to check properties correctly
Option 1 (Recommended): Object.hasOwn()
Modern JavaScript provides Object.hasOwn().

const obj = Object.create(null);
obj.name = "pavan";
console.log(Object.hasOwn(obj, "name")); // true
This works even if the object has a null prototype.

Option 2: Borrow hasOwnProperty
console.log(
  Object.prototype.hasOwnProperty.call(obj, "name")
);

Output:
true

Here you're calling the hasOwnProperty method from Object.prototype and explicitly using obj as its this value.

Why use Object.create(null)?
It's useful when you want a pure dictionary (hash map) with no inherited properties.
const dict = Object.create(null);
dict.apple = 10;
dict.orange = 20;
console.log(dict.apple); // 10

This avoids conflicts with inherited property names like:
const normal = {};
normal.constructor;     // inherited
normal.toString;        // inherited

const pure = Object.create(null);
console.log(pure.constructor); // undefined
console.log(pure.toString);    // undefined

This makes Object.create(null) ideal for lookup tables or maps where every key should belong only to your data.

Visual comparison Using {}
    obj
    │
    ▼
    Object.prototype
    │
    ├── hasOwnProperty()
    ├── toString()
    ├── valueOf()
    └── ...

    obj.hasOwnProperty("name") ✅

    Using Object.create(null)
        obj
        │
        ▼
        null
    obj.hasOwnProperty("name") ❌

Modern best practice: 
Prefer Object.hasOwn(obj, "name") over obj.hasOwnProperty("name"), because it works for both normal objects and 
objects created with Object.create(null).