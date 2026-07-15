In JavaScript, property descriptors are commonly divided into two types:

1. Data Descriptor:
    A data descriptor describes a property that stores a value.

    A data descriptor can contain:
    | Property       | Meaning                                                 |
    | -------------- | ------------------------------------------------------- |
    | `value`        | The property's value                                    |
    | `writable`     | Whether the value can be changed                        |
    | `enumerable`   | Whether it appears in `Object.keys()`, `for...in`, etc. |
    | `configurable` | Whether the property can be deleted or reconfigured     |

    console.log(obj.name); // Pavan
    obj.name = "John";
    console.log(obj.name); // John

2. Accessor descriptor:
    An accessor descriptor uses get and/or set functions instead of directly storing a value.
    const emp={"firstName": 'pavan', 'lastName': 'bhogala'}

    Object.defineProperty(emp, "fullname",
        {
            get(){
                return `${this.firstName} ${this.lastName}`
            },
            set(value){
                [this.firstName, this.lastName]=value.split(" ")
            },
            configurable: true,
            enumerable: true
        }
    )

An object Cannot both specify accessors and a value or writable attribute:
--------------------------------------------------------------------------
// If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor. 
// If a descriptor has both value or writable and get or set keys, an exception is thrown.

    const emp={"firstName": 'pavan', 'lastName': 'bhogala'}

    Object.defineProperty(emp, "name",
    {
        value: "guru",
        writable: true,
        configurable: true,
        enumerable: true
    }
    )

    console.log(emp)
    emp.name='reddy'
    console.log(emp)

    // TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
    Object.defineProperty(emp, "fullname",
        {
            get(){
                return `${this.firstName} ${this.lastName}`
            },
            set(value){
                [this.firstName, this.lastName]=value.split(" ")
            },
            configurable: true,
            enumerable: true,
            writable: true // since writable is configured, TypeError occurs
        }
    )

// this works
Object.defineProperty(emp, "fullname",
    {
        get(){
            return `${this.firstName} ${this.lastName}`
        },
        set(value){
            [this.firstName, this.lastName]=value.split(" ")
        },
        configurable: true,
        enumerable: true
    }
)

// You cannot try to mix both:
// throws a TypeError: value appears
// only in data descriptors,
// get appears only in accessor descriptors
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get() { return 0xdeadbeef; }
});
###########################
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
###########################
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
//The configurable attribute controls at the same time whether the property can be deleted from the object and 
// whether its attributes (other than value and writable) can be changed.
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

//#################################################
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

// #######################################################
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


// #######################################################
//delete a property in an object:
let personDetails={
	name: 'person',
	age: 30
}

delete personDetails.age
console.log(personDetails)

// In JavaScript, you cannot directly rename a property (there’s no Object.renameProperty).
// But you can achieve the same effect by adding a new property with the new name and deleting the old one.
let emp = { id: 1, name: "Pavan", age: 40 };
// Rename "name" → "fullName"
emp.fullName = emp.name;
delete emp.name;
console.log(emp); 
// { id: 1, age: 40, fullName: "Pavan" }

// #######################################################
let newEmployee={}
Object.defineProperty(newEmployee, 'middleName', {configurable:true, writable:true, enumerable: true})
newEmployee.middleName='kumar'
console.log('#########################')
console.log(newEmployee)
console.log('#########################')

let middleNameDescriptor=Object.getOwnPropertyDescriptor(newEmployee, 'middleName')
console.log(middleNameDescriptor)