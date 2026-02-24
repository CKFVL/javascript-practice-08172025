let newEmployee1 = {id:22, name: 'pavan', age: 34};
let newEmployee2 = {id:23, name: 'bhogala', age: 34};
let newEmployee3 = {id:24, name: 'vani', age: 41};

let empArr=[newEmployee1, newEmployee2, newEmployee3];
for(const emp of empArr){
  console.log(emp.name)
  console.log(emp.age)
}
console.log('$$$$$$$$$$$$$$$$$$')
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
// ❌ TypeError in strict mode
//newEmployee1.name='newName'
---
enumerable:
If enumerable: false, the property won’t appear in loops or Object.keys().
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

Data property → Accessor property
is not allowed when configurable: false.

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

// change the value (change enumerable:true when testing)
employee.name='kumar'
console.log(employee) // same value= { name: 'bhogala gurupavan' }

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
// Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. 
//A data descriptor is a property that has a value, which may or may not be writable. 
//An accessor descriptor is a property described by a getter-setter pair of functions. 
//A descriptor must be one of these two flavors; it cannot be both.

// Both data and accessor descriptors are objects. 
// They share the following optional keys(The default value is in the case of defining properties using Object.defineProperty()):
    - configurable
    - enumerable
    - writable


// A data descriptor also has the following optional keys:
// value
// The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
// Defaults to undefined.
// writable
// true if and only if the value associated with the property may be changed with an assignment operator.
// Defaults to false.
var o = {}; // Creates a new object

o.a=37 // equivalent to
// Example of an object property added
// with defineProperty with a data property descriptor
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});

// An accessor descriptor also has the following optional keys:
//get
// A function which serves as a getter for the property, or undefined if there is no getter.
// When the property is accessed, this function is called without arguments and with this set to the object through which the property is accessed (this may not be the object on which the property is defined due to inheritance). The return value will be used as the value of the property.
//Defaults to undefined.
//set
//A function which serves as a setter for the property, or undefined if there is no setter. 
// When the property is assigned to, this function is called with one argument (the value being assigned to the property) and with this set to the object through which the property is assigned.
//Defaults to undefined.
var bValue = 38;
Object.defineProperty(o, 'b', {
  // Using shorthand method names (ES2015 feature).
  // This is equivalent to:
  // get: function() { return bValue; },
  // set: function(newValue) { bValue = newValue; },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});
o.b; // 38

// If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor. 
// If a descriptor has both value or writable and get or set keys, an exception is thrown.

// You cannot try to mix both:
// throws a TypeError: value appears
// only in data descriptors,
// get appears only in accessor descriptors
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get() { return 0xdeadbeef; }
});

// Bear in mind that these attributes are not necessarily the descriptor's own properties. Inherited properties will be considered as well. 
// In order to ensure these defaults are preserved, you might freeze the Object.prototype upfront, specify all options explicitly, 
// or point to null with Object.create(null).
// https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/699d0a1a-2478-8323-87b3-a03ce8d55830
var obj = {};
var descriptor = Object.create(null); 
descriptor.name = "Pavan";
  This creates:
    An object with no prototype
    No inherited properties (no toString, no hasOwnProperty, etc.)
  But it does NOT change property descriptor defaults.
  
This behaves exactly like a normal object property.
The descriptor will be:
  {
    value: "Pavan",
    writable: true,
    enumerable: true,
    configurable: true
  }

// being explicit
Object.defineProperty(obj, 'key', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: 'static'
});

Case 2: 
  Using Object.defineProperty()
  const obj = Object.create(null);

  Object.defineProperty(obj, "age", {
    value: 34
  });

  If you don’t specify descriptor flags, the defaults are:
  {
    value: 34,
    writable: false,
    enumerable: false,
    configurable: false
  }
  ⚠️ This is true for any object, not just Object.create(null).

Case 3: 
  Using Object.create with property descriptors
  Object.create has a second argument:

  const obj = Object.create(null, {
    salary: {
      value: 50000
    }
  });

  Same rule applies.
  Default descriptor becomes:
  {
    value: 50000,
    writable: false,
    enumerable: false,
    configurable: false
  }
  Because it internally behaves like Object.defineProperty().


var sp = {
  ...o
}
console.log(sp.a)
console.log(sp.b)
console.log(sp.c)
console.log(sp.d); // true
console.log(sp[Symbol.for('d')])
console.log(o.propertyIsEnumerable('d')); // true

// ###########################################################################
//Configurable attribute
//The configurable attribute controls at the same time whether the property can be deleted from the object and whether its attributes (other than value and writable) can be changed.
var o = {};
Object.defineProperty(o, 'a', {
  get() { return 1; },
  configurable: false
});

Object.defineProperty(o, 'a', {
  configurable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
  enumerable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
  set() {}
}); // throws a TypeError (set was undefined previously)
Object.defineProperty(o, 'a', {
  get() { return 1; }
}); // throws a TypeError
// (even though the new get does exactly the same thing)
Object.defineProperty(o, 'a', {
  value: 12
}); // throws a TypeError // ('value' can be changed when 'configurable' is false but not in this case due to 'get' accessor)

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1

//Adding properties and default values
//It is important to consider the way default values of attributes are applied. 
// There is often a difference between simply using dot notation to assign a value and using Object.defineProperty(), as shown in the example below
var o = {};

o.a = 1;
// is equivalent to:
Object.defineProperty(o, 'a', {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});

// On the other hand,
Object.defineProperty(o, 'a', { value: 1 });
// is equivalent to:
Object.defineProperty(o, 'a', {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});

// Custom Setters and Getters
//The example below shows how to implement a self-archiving object. When temperature property is set, the archive array gets a log entry.

function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get() {
      console.log('get!');
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]

//-------------------------------------------------------------------------
// summary:
// by default, object created with Object.defineProperty() is immutable(i.e., enumerable:false, configurable: false, writable:false)
// value assigned to object, via dot notation, object.property is not immutable (i.e., enumerable:true, configurable: true, writable:true)
	// i.e., properties defined without Object.defineProperty can be assigned or changed anytime.
// objects defined with Object.defineProperty() has the following optional keys: configurable and enumerable
// object can't have both data (value & writable) and accessor descriptors (get & set)
// if an object doesn't have any descriptor properties, it is data descriptor by default.
// configurable property helps in determining whether a property can be deleted or its attributes can be changed (except value and writable)
// enumerable property determines whether the property or symbol can be accessed via console.log(obj) (in most JS consoles) OR for...in loop OR spread operator OR Object.assign OR Object.keys
// To avoid inheritance, freeze the Object.prototype upfront, specify all options explicitly, or point to null 
// with Object.create(null).
// If a value is shared, then objects created using Object.defineProperty will read or write to the same value using accessor properties (get/set methods) and to the prototype properties too.
// unlike accessor properties, value properties will always be set on object itself but not on prototype. 
// However, if a non-writable value property is inherited, it still prevents from modifying the property on the object.
// ##########################################################################
// Non-configurable properties:
// can be created using Object.defineProperty() or Object.freeze().
var obj = Object.freeze({name: 'Elsa', score: 157});
Object.defineProperty(obj, 'foo', {value: 2, configurable: false});
var frozenArray = Object.freeze([0, 1, 2]);

//The configurable attribute controls whether the property can be deleted from the object and whether its attributes (other // than writable) can be changed.
// TypeError happens only in strict mode code. In non-strict code, the operation returns false.
delete obj.score;  // TypeError
delete obj.foo;  // TypeError
frozenArray.pop();  // TypeError

//There are also a few non-configurable properties built into JavaScript. Maybe you tried to delete a mathematical constant.
'use strict';
delete Math.PI;  // TypeError

// ##########################################################################
// In JavaScript, you cannot directly rename a property (there’s no Object.renameProperty).
// But you can achieve the same effect by adding a new property with the new name and deleting the old one.
let emp = { id: 1, name: "Pavan", age: 40 };
// Rename "name" → "fullName"
emp.fullName = emp.name;
delete emp.name;
console.log(emp); 
// { id: 1, age: 40, fullName: "Pavan" }

Object.defineProperty(newEmployee, 'middleName', {configurable:true, writable:true, enumerable: true})
newEmployee.middleName='kumar'
console.log('#########################')
console.log(newEmployee)
console.log('#########################')

let middleNameDescriptor=Object.getOwnPropertyDescriptor(newEmployee, 'middleName')
Object.defineProperty(newEmployee, 'lastName', {configurable:true, writable:true, enumerable: true})
newEmployee.lastName='bhogala'
console.log('@@@@@@@@@@@@@@@@@@@@@@@')
console.log(newEmployee)
console.log('@@@@@@@@@@@@@@@@@@@@@@@')
delete a property in an object:
var personDetails:{
	name: 'person',
	age: 30
}

delete personDetails.age
