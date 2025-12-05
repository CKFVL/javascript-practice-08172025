let newEmployee2 = {id:23, name: 'bhogala', age: 34};
let newEmployee3 = {id:24, name: 'vani', age: 41};

//Object.defineProperty(newEmployee, 'name', {configurable:false, writable: true}) - throws error--Cannot redefine property: name
let empArr=[newEmployee, newEmployee2, newEmployee3];
for(const emp of empArr){
  console.log(emp.name)
  console.log(emp.age)
}
console.log('$$$$$$$$$$$$$$$$$$')
for(const emp in empArr){
  console.log(emp)
  console.log(empArr[emp].name)
  console.log(empArr[emp].age)
}

// Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. 
//A data descriptor is a property that has a value, which may or may not be writable. 
//An accessor descriptor is a property described by a getter-setter pair of functions. 
//A descriptor must be one of these two flavors; it cannot be both.

// Both data and accessor descriptors are objects. They share the following optional keys(The default value is in the case of defining properties using Object.defineProperty()):

// configurable
//true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. 
// Defaults to false.

######################################################
//enumerable
//true if and only if this property shows up during enumeration of the properties on the corresponding object. 
// Defaults to false.
var o = {}
Object.defineProperty(o, 'a', {
  value: 1,
  enumerable: true
})

Object.defineProperty(o, 'b', {
  value: 1,
  enumerable: false
})

Object.defineProperty(o, 'c', {
  value: 1 // enumerable defaults to false
})

Object.defineProperty(o, Symbol.for('d'), {
  value: 1,
  enumerable: true
})

Object.defineProperty(o, Symbol.for('f'), {
  value: 1,
  enumerable: false
})

// enumerable defaults to true when creating a property by setting it
o.e = 99

for (var e in o) {
  console.log(e)
}

console.log(Object.keys(o))
console.log(o.c)

##################
Object.defineProperty(newEmployee, 'name', {
  configurable: false,
  writable: false,
  enumerable: true
});
If you don’t give a value, the default is undefined.
So even though the property exists and is enumerable, its value is still undefined.

Object.defineProperty(newEmployee, 'name', {
  value: 'pavan',
  configurable: false,
  writable: false,
  enumerable: true
});

####################

// A data descriptor also has the following optional keys:
//value
//The value associated with the property. Can be any valid JavaScript value (number, object, function, etc).
// Defaults to undefined.
//writable
//true if and only if the value associated with the property may be changed with an assignment operator.
//Defaults to false.
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
//A function which serves as a getter for the property, or undefined if there is no getter. When the property is accessed, this function is called without arguments and with this set to the object through which the property is accessed (this may not be the object on which the property is defined due to inheritance). The return value will be used as the value of the property.
//Defaults to undefined.
//set
//A function which serves as a setter for the property, or undefined if there is no setter. When the property is assigned to, this function is called with one argument (the value being assigned to the property) and with this set to the object through which the property is assigned.
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

// If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor. If a descriptor has both value or writable and get or set keys, an exception is thrown.

// You cannot try to mix both:
// throws a TypeError: value appears
// only in data descriptors,
// get appears only in accessor descriptors
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get() { return 0xdeadbeef; }
});

// Bear in mind that these attributes are not necessarily the descriptor's own properties. Inherited properties will be considered as well. In order to ensure these defaults are preserved, you might freeze the Object.prototype upfront, specify all options explicitly, or point to null with Object.create(null).
var obj = {};
var descriptor = Object.create(null); // no inherited properties
// not enumerable, not configurable, not writable as defaults
descriptor.value = 'fsfs';
Object.defineProperty(obj, 'city', descriptor);
console.log(descriptor.value)
descriptor.value='jhghj'
console.log(descriptor.value)

// being explicit
Object.defineProperty(obj, 'key', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: 'static'
});

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
//It is important to consider the way default values of attributes are applied. There is often a difference between simply using dot notation to assign a value and using Object.defineProperty(), as shown in the example below
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

//----------------------------------------------------------------------
'use strict'

// Inheritance of properties
//If an accessor property is inherited, its get and set methods will be called when the property is accessed and modified on descendant objects. 
// If these methods use a variable to store the value, this value will be shared by all objects.
function myclass() {
}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // 1

//This can be fixed by storing the value in another property. In get and set methods, this points to the object which is used to access or modify the property.

//myclass.prototype.stored_x=33 // accessor properties will be set on prototype too
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;
  },
  set(x) {
    this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(a.x);
console.log(b.x); // undefined OR 33 if stored_x is in myclass prototype
console.log(myclass.prototype.stored_x) // 33 if stored_x is in myclass prototype

//Unlike accessor properties, value properties are always set on the object itself, not on a prototype. 
// However, if a non-writable value property is inherited, it still prevents from modifying the property on the object.
function myclass() {
}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1

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
