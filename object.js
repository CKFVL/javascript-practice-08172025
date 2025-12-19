// ########################################################################
const object1={
    name: 'pavan',
}
console.log(object1.name);

//access object properties using brackets: used when properties are not accessible with . notation
const object2={
    'delivery-time': '1-day' // delivery-time has -  then it can't be accessible
}
console.log(object2['delivery-time');

bracket notation can be used when property has - in it or need to use another variable
e.g.
let newName='bhogala'
person[newName]='kumar'

// function inside object called Method
cosnt object3={
	fun: function function1(){
		console.log("inside function");
	}
}

object3.function1()
// ########################################################################
const obj1={name:'pavan'}
const obj2={name:'pavan'}
console.log(obj1==obj2) // false
console.log(obj1===obj2) // false 

In JavaScript, objects are reference types — the variables don’t store the actual object, they store a reference (memory address) to where the object lives in memory.
So even if two objects contain exactly the same key-value pairs, they are considered different objects if they were created separately.

const obj1 = { name: 'pavan' }
const obj2 = { name: 'pavan' }

console.log(obj1 == obj2)   // false
console.log(obj1 === obj2)  // false

Why both are false?
== checks for loose equality. For objects, it still compares by reference, not by structure/value.
=== checks for strict equality, also comparing the reference.

Since obj1 and obj2 are two different objects stored at two different locations in memory, their references are different, so both comparisons return false.
When would it return true?
Only if both variables point to the exact same object instance:

const obj1 = { name: 'pavan' }
const obj2 = obj1

console.log(obj1 == obj2)   // true
console.log(obj1 === obj2)  // true
Here, obj1 and obj2 reference the same object, so the comparison evaluates to true.

// ########################################################################
// https://www.youtube.com/watch?v=RJaRRS27100
var obj = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.keys(obj)) //keys only
// produces an array of keys : [ '0', '1', '2' ]

var obj2 = { foo: 'bar', baz: 42 }
console.log(Object.values(obj2)) // values only
// produces an array of values: [ 'a', 'b', 'c' ]

console.log(Object.entries(obj2)) // entries only
// produces an array of array[k,v] i.e. [['0','a'],['1','b'],['2','c']]

// ########################################################################
// to check if a property exists in object (prototype)
console.log(person5.hasOwnProperty('name'));
// ########################################################################
const protoTypeObject=Object.create(Object.prototype);
const literalObject={}
// above both objects are same
console.dir(protoTypeObject)
console.dir(literalObject)
// ########################################################################
// Objects can be initialized using new Object(), Object.create(), Object.assign({}, anotherObject)
// to create an object with no properties/prototype
const noPrototype = Object.create(null)
console.dir(noPrototype)

// ########################################################################

'use strict'
function myclass(){
  
}

myclass.prototype.x=1
Object.defineProperty(myclass.prototype, "y", {
  writable: true,
  value: 1
})

var a =new myclass();
a.x=2

console.log(a.x) // 2
console.log(myclass.prototype.x) // 1

a.y=55
console.log(a.y) // 55
console.log(myclass.prototype.y) // 1
// ########################################################################
Sevral ways to create objects:
-----------------------------
1. Object literal:
   const literalPerson={
     name: "pavan",
     age: 40,
     greet(){
	console.log(`Hi, this is ${this.name}`}     
     }
   }

   console.log(typeof literalPerson) // object
   console.log(literalPerson.name)
   literalPerson.greet()

✅ Pros:
	Simple & readable
	Best for static objects
	No this confusion during creation
❌ Cons
	Not ideal for creating many similar objects

	example 2: add method to object
	---------
    const video = {
    title: 'a',
    play() {
        console.log(this);
		console.log(this.title);
    }
	};
	video.play();
	
	// add method to video object
	video.stop = function () {
	    console.log(this);
	}
	video.stop();
-----------------------------
2. new Object()
	⚠️ Rarely used in modern code
   const objPerson=new Object(); // use new
   objPerson.name='pavan';
   objPerson.age=40;

	const literalPerson = {
	  name: "pavan",
	  age: 40
	};

	console.log(objPerson === literalPerson) // false (=== checks reference for objects)
		Why?
		Objects are compared by reference, not by structure or values.
		Even though both objects have the same properties and values, they are stored at different memory locations.
		literalPerson  ---> 0x001
		objPerson      ---> 0x002

📌 Key point
Two different objects are never equal unless they reference the same object.

	console.log(typeof objPerson == typeof literalPerson) // true
		Why?
		typeof literalPerson // "object"
		typeof objPerson     // "object"
		So:
		"object" == "object" // true

	console.log(typeof objPerson === typeof literalPerson) // true
		Why?
		Both sides are the same string
		Same value and same type
		"object" === "object" // true

----------------------------------------------------------
******* Note: 
		typeof {} === typeof new Object() // true
		{} === new Object() // false	
----------------------------------------------------------
3. constructor function (Pre-ES6 pattern)
   function Person(name, age){
	this.name=name,
	this.age=age
   }

	Person.prototype.greet = function(){
		console.log(this.name
	}
    const funcPerson=new Person('pavan', 40) // use new

	⚠️ Important
		Must use new
		this binding depends on new
			User("Pavan", 35); // ❌ this → global / undefined (strict mode)

	// when constructor function is created using Object.create, passed arguments/Object as {} is not passed to function's `this`
	// Object.create(Object.prototype)
----------------------------------------------------------
4. Object.create(<prototype>): (Pure Prototypal Inheritance) Creates a new object with a specified prototype
   const prototype={
	greet(){
	   console.log(`Hi this is ${this.name`)
	}
   };

   const protoObject=Object.create(prototype)
   protoObject.name='pavan'
   protoObject.greet();

   Using Object.create() inside a regular function
	function personProto(name, age) {
	  let obj = Object.create(null);
	  obj.name = name;
	  obj.age = age;
	  return obj;
	}
	
	const p3 = personProto("Charlie", 28);
	console.log(p3.name); // Charlie

🔥 Key Features
	Direct control over prototype
	No constructor function needed
	Object.getPrototypeOf(user) === proto // true

Use cases
	Prototype-based design
	Avoid constructor overhead
----------------------------------------------------------
5. ES6 Class syntax
   class Person{
	constructor(name, age){
	  this.name=name;
	  this.age=age;
	}

     greet(){
	console.log(`Hi, this is ${this.name}`)
     }
   }

   const classPerson=new Person('name', 40) // use new
----------------------------------------------------------
6. Factory function: A function that returns a new object
  function FactoryFunc(name, age){
  return {
	    name,
	    age,
	    greet(){
	      console.log(`Hi, this is ${this.name}`)
	    }
  	};
  
	}
  const fobj=FactoryFunc('pavan', 40)
  fobj.greet()

  Example 2:
	var factoryObj = function (name, age, state) {
	    var temp = {};
	    //var temp = { name: "jhgjhh" };
	    temp.name = name;
	    temp.age = age;
	    temp.state = state;
	
	    temp.printPerson = function () {//part of temp object and this refers to `temp`
	        console.log(this.name + ", " + this.age + ", " + this.state
	        )
	    }
	    return temp;
	}

		var person2 = factoryObj("kumar", "23", "tel")
		var person1 = factoryObj("34", "ap")
		
		person1.printPerson()
		person2.printPerson()

✅ Pros
	No new
	Safer this handling
	Easy to compose
	
❌ Cons
	Methods recreated per object (unless optimized)
---------------------------------------------------------- 
7. Object.assign(): Merge properties from one or more objects into a new one (copy properties of one object to another)
	const base = { name: 'Pavan' };
	const info = { age: 30 };
	
	const person = Object.assign({}, base, info);

 	Example 2:
    ----------
	let toyota = {
    drive() {
        return "driving toyota"
    },
    music() {
        return "playing in toyota"
    }

	}
	
	let camry = {
	    drive() {
	        return "driving camry"
	    },
	    doorType() {
	        return "4 door"
	    }
	}
	
	// copies toyota's properties to camry's properties, 
	// if same property or function is in destination object, then it'll be replaced with source's
	Object.assign(camry, toyota)
	console.dir(camry)
	console.log(camry.drive())
	
	// useful when need to copy/create new object from existing object using literal i.e., shallow copy
	let newToyota = Object.assign({}, toyota)
	console.dir(newToyota)
	
	console.log(newToyota.drive())
	
	// also useful when new property or method needs to be added to existing object
	let addToyotaProperty = Object.assign(toyota, {
	    wifi() {
	        return 'wifi added';
	    },
	    color: 'red'
	});
	
	console.dir(addToyotaProperty)
	console.log(addToyotaProperty.color)
	console.log(addToyotaProperty.wifi())

------------------------------------------------------
Using Spread Operator
const base = { role: "admin" };

const user = {
  ...base,
  name: "Pavan",
  age: 35
};

*** Equivalent to Object.assign() for objects.
######################################################

6. With call() or apply()
	function Person(name, age) {
	  this.name = name;
	  this.age = age;
	}
	
	const obj = {};
	Person.call(obj, "Dana", 35); // 'this' is obj
	console.log(obj.name); // Dana

----------------------------------------------------------
 	
8. prototype pattern
	var prototypeObj = function () { };
	prototypeObj.prototype.age = 343;
	prototypeObj.prototype.name = "no name"
	prototypeObj.prototype.city = "no cikty"
	
	prototypeObj.prototype.printPerson = function () {
	    console.log(this.age + ", " + this.name + ", " + this.city)
	}
	
	var person5 = new prototypeObj();
	//person5.name = "nihi"
	person5.age = 2
	person5.city = "hyd"
	person5.printPerson()
	
	// to check if a property exists in object (prototype)
	console.log('name' in person5) // checks in person5 object and then in proptype too
	console.log('namfsde' in person5)
	console.log(person5.hasOwnProperty('name'));
	
	// if another object is created, then it gets default values defined in prototype
	var p1=new prototypeObj();

 	Example 2: (Informational)
  	// dynamic prototype: similar to constructor pattern but properties/functions can be created only when they don't exist
		var dynamicprototypeObj = function (name, age, city) {
		    this.age = age;
		    this.name = name
		    this.city = city
		
		    if (typeof this.printPerson !== 'function') {
		        console.log("function doesn't exists")
		        this.printPerson = function () {
		            console.log(this.age + ", " + this.name + ", " + this.city)
		        }
		    }
		};
		var person6 = new dynamicprototypeObj("sfddwekjjnkj", 222, "wewq");
		person6.printPerson()
		person6.age = 656
		person6.printPerson()
		// to check if a property exists in object (prototype)
		console.log('name' in person6) // checks in person6 object and then in proptype too
		console.log(person6.hasOwnProperty('name')) // checks in person6 object
----------------------------------------------------------
// Object.setPrototypeOf() : takes one object's method to be available for another object
// e.g., Object.setPrototypeOf(destinationObject, sourceObject)
// https://www.youtube.com/watch?v=mX7uWf9BL8A&list=PL7pEw9n3GkoW0ceMeoycg9D00YjPAbtvt&index=6
let toyota = {
    drive() {
        return 'driving toyota';
    }
}

let camry = {
    wifi() {
        return `camry's wifi`
    },
    drive() {// if camry needs to have its own drive method
        //return 'driving camry';
        // if need to use base/super class constructor in sub class, then use super constructor in template string
        return `${super.drive()} camry`
    }
}
// copies toyota's properties to camry's (__proto__)properties,  
// if same property or function is in destination object, then it will NOT be replaced with source's
Object.setPrototypeOf(camry, toyota);
console.dir(camry)
console.log(camry.drive())
console.log(camry.wifi())

######################################################
Object.setPrototypeOf(dest, source)
Changes the prototype chain of dest to be source.
In other words, source becomes the prototype (i.e., __proto__) of dest.
As a result, dest will inherit properties from source, but those properties are not copied — they are looked up via the prototype chain.

const animal = { speak() { console.log('hello') } }
const dog = { name: 'tommy' }
Object.setPrototypeOf(dog, animal)
console.log(dog.speak())   // works via prototype

*** Usually discouraged for performance reasons, because changing prototype at runtime can slow things down.

Object.assign(dest, source)
Copies the own, enumerable properties from source into dest.
Does not affect prototype/inheritance.
This is just copying values (shallow copy).

const animal = { speak() { console.log('hello') } }
const dog = { name: 'tommy' }
Object.assign(dog, animal)
console.log(dog.speak())  // copied directly onto dog

This is how we often do mixins, simple cloning, or merging of objects.

Summary
Feature					Object.setPrototypeOf()						Object.assign()
What it does			Sets the prototype of dest to source		Copies properties from source to dest
Copying happens?		❌ No, properties are inherited				✅ Yes, shallow copy
Relationship after use	dest.__proto__ === source					No prototype connection
Use case				Inheritance / prototype chain manipulation	Merging / shallow cloning
Performance impact		Slower, discouraged in hot code				Fast and safe

######################################################
The behavior of this in JavaScript depends on how a function is called, not how the object was created. 
However, the way you create an object can influence how you call the method, which affects what this refers to.

Overview of this in different object creation techniques:
1. Object Literal
   const person = {
	  name: 'Pavan',
	  greet() {
	    console.log(this.name); // "this" refers to "person"
	  }
	};
	person.greet(); // Output: "Pavan"

 this refers to the object the method is called on (here, person).

2. new Object()
	const person = new Object();
	person.name = 'Pavan';
	person.greet = function () {
	  console.log(this.name);
	};
	person.greet(); // Output: "Pavan"

  Same as object literal — this refers to person.

 3. Constructor Function
 	function Person(name) {
	  this.name = name;
	  this.greet = function () {
	    console.log(this.name);
	  };
	}
	const p1 = new Person('Pavan');
	p1.greet(); // Output: "Pavan"

  Inside constructor: this refers to the new object being created (p1).
  Inside method: this refers to p1 when called as p1.greet().

4. Object.create(): this refers to the calling object (person), even though the method is defined on the prototype.
	const proto = {
	  greet() {
	    console.log(this.name);
	  }
	};
	const person = Object.create(proto);
	person.name = 'Pavan';
	person.greet(); // Output: "Pavan"
this refers to the calling object (person), even though the method is defined on the prototype.

5. ES6 Class:
   class Person {
	  constructor(name) {
	    this.name = name;
	  }
	
	  greet() {
	    console.log(this.name);
	  }
	}
	const p1 = new Person('Pavan');
	p1.greet(); // Output: "Pavan"
Same behavior: this refers to the instance (p1).


6. Factory function
	function createPerson(name) {
	  return {
	    name,
	    greet() {
	      console.log(this.name);
	    }
	  };
	}
	const p1 = createPerson('Pavan');
	p1.greet(); // Output: "Pavan"

 7. Object.assign()
 	const base = {
	  greet() {
	    console.log(this.name);
	  }
	};
	const person = Object.assign({}, base, { name: 'Pavan' });
	person.greet(); // Output: "Pavan"

 Again, this refers to the object the method is called on (person).

// ########################################################################
'use strict'
// ways of creating objects
// literal
// constructor pattern
// factory pattern
// prototype pattern
// dynamic prototype pattern : similar to constructor pattern, but properties/functions can be created only when they don't exist
// default values can be setup in all above patterns, so new objects can inherit them.

// Objects can be initialized using new Object(), Object.create(), Object.assign({}, anotherObject)
	// to create an object with no properties/prototype
	// Object.create(null)
	
	// when constructor function is created using Object.create, passed arguments/Object as {} is not passed to function's `this`
	// Object.create(Object.prototype)

// rule of thumb:
// this : object that is executing the current function
// if a function is a method in an Object, this refers to object itself
// if a function is regular function i.e., not inside an object, this refers to global object
//      in strict mode, global object can't be accessed inside a function using this
// if a function is constructor function and is created using new operator, then this refers to arguments to it in new {} object

// set/copy properties/methods
	// Object.defineProperty
	// Object.setPrototypeOf(dest, source) // copy one object to another
	// Object.assign(dest, source) // copy one object to another  OR copy/create new object from existing object using literal i.e., shallow copy OR when new property or method needs to be added to existing object
	
	// destructuring
		// with destructuring, 
			// copying values can be done in one line
			// values can be copied to variables with new names
			// With ECMAScript 2015, there is a shorter notation available to copy individual variables to object:
				var a = 'foo',
					b = 42,
					c = {};

				// Shorthand property names (ES2015)
				var o = { a, b, c };
			// function parameters can be destructured (with default values)



// ---------------------------------------------------------------------


// ---------------------------------------------------------------------


// getOwnPropertyNames
//preventExtensions
//isExtensible
//seal
//freeze
//ofArray
//ofObject
// ---------------------------------------------------------------------
// literal
// (initializer notation). An object initializer is a comma-delimited list of zero or more pairs of property 
// names and associated values of an object, enclosed in curly braces ({}).
// An object initializer is an expression that describes the initialization of an Object. 
// Objects consist of properties, which are used to describe an object. Values of object properties 
// can either contain primitive data types or other objects.
//  var object = {
//    foo: 'bar',
//    age: 42,
//    baz: { myProp: 12 }
//  }

var literalobject = {
    foo: 'bar',
    age: 42,
    baz: { myProp: 12 }
  } 
 console.log(literalobject.foo)
  
//

// ---------------------------------------------------------------------
// to create an object with no properties/prototype
const noPrototype = Object.create(null)
console.dir(noPrototype)

//
const ConsFn = function (_color) {
    this.color = _color
}
const consFn = new ConsFn('orange');
console.log(consFn.color)

// when constructor function is created using Object.create, passed arguments/Object as {} is not passed to function's `this`
const consObjectFromCreate = Object.create(ConsFn.prototype);
console.log(consObjectFromCreate.color)


// Object.setPrototypeOf() : takes one object's method to be available for another object
// e.g., Object.setPrototypeOf(destinationObject, sourceObject)
// https://www.youtube.com/watch?v=mX7uWf9BL8A&list=PL7pEw9n3GkoW0ceMeoycg9D00YjPAbtvt&index=6
let toyota = {
    drive() {
        return 'driving toyota';
    }
}

let camry = {
    wifi() {
        return `camry's wifi`
    },
    drive() {// if camry needs to have its own drive method
        //return 'driving camry';
        // if need to use base/super class constructor in sub class, then use super constructor in template string
        return `${super.drive()} camry`
    }
}
// copies toyota's properties to camry's (__proto__)properties,  
// if same property or function is in destination object, then it will NOT be replaced with source's
Object.setPrototypeOf(camry, toyota);
console.dir(camry)
console.log(camry.drive())
console.log(camry.wifi())

// ---------------------------------------------------------------------
// Object.assign(): copy properties of one object to another
let toyota = {
    drive() {
        return "driving toyota"
    },
    music() {
        return "playing in toyota"
    }

}

let camry = {
    drive() {
        return "driving camry"
    },
    doorType() {
        return "4 door"
    }
}

// copies toyota's properties to camry's properties, 
// if same property or function is in destination object, then it'll be replaced with source's
Object.assign(camry, toyota)
console.dir(camry)
console.log(camry.drive())

// useful when need to copy/create new object from existing object using literal i.e., shallow copy
let newToyota = Object.assign({}, toyota)
console.dir(newToyota)

console.log(newToyota.drive())

// also useful when new property or method needs to be added to existing object
let addToyotaProperty = Object.assign(toyota, {
    wifi() {
        return 'wifi added';
    },
    color: 'red'
});

console.dir(addToyotaProperty)
console.log(addToyotaProperty.color)
console.log(addToyotaProperty.wifi())

// also useful for function mixing
// https://www.youtube.com/watch?v=DpGuDFK4xss&list=PL7pEw9n3GkoW0ceMeoycg9D00YjPAbtvt&index=8
// ##########################################################################
// https://www.youtube.com/watch?v=RJaRRS27100
var obj = { 0: 'a', 1: 'b', 2: 'c' }
console.log(Object.keys(obj)) //keys only

var obj2 = { foo: 'bar', baz: 42 }
console.log(Object.values(obj2)) // values only

console.log(Object.entries(obj2)) // entries only
// ##########################################################################
//destructuring: allows multiple properties to extract from object
var user = {
    name: "pavan",
    age: "35",
    city: "hyderabad"
}

// to extract multiple values, earlier we used to do like below
//var name = user.name;
//var age = user.age;
//var city = user.city;
//console.log(name + " : " + age + " : " + city)

// with destructuring
var { name, age, city } = user // Note: new variable names should be same as in object properties
console.log(name + " : " + age + " : " + city)

// gives ability to rename properties in object
var { name: newName, age: newAge, city: newCity } = user
console.log(newName + " : " + newAge + " : " + newCity)

var csv = "1997,ford,f530,sell"
var [year, make, model, desc] = csv.split(",")
console.log(year, make, model, desc)

// destructuring function parameters
function fetchRepos({ language = 'all', stars = '99', createdBefore = '' }) {// assign default values
    console.log(language, ", stars: " + stars, createdBefore)
}
// no need to pass all arguments.
// arguments are mapped by property names
fetchRepos({ language: 'javascript', createdBefore: new Date().getTime() })
//---------------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
// to copy object to another
var a = 'foo',
    b = 42,
    c = {};

var o = {
    a: a,
    b: b,
    c: c
}
//With ECMAScript 2015, there is a shorter notation available to achieve the same:
var a = 'foo',
    b = 42,
    c = {};

// Shorthand property names (ES2015)
var o = { a, b, c };

// In other words,
console.log((o.a === { a }.a)); // true
// ##########################################################################
//Object literal notation vs JSON
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
// limitations of JSON:
//- JSON permits only property definition using "property":value syntax
//- property name must be double-quoted
//- In JSON, property values can be only Array, Boolean, Null, Number, Object, String or another JSON object
//- a function value cannot be asssigned to a value in JSON.
//- Objects like Date will be string after JSON.Parse()
//- JSON.parse() will reject computed property names and an error will be thrown

//To convert an object to a JSON string, you can use JSON.stringify(obj). 
//To convert string to javascript object, you can use JSON.parse(data1)
//############################################################################
// check if object is empty
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};
// ##########################################################################
'use strict'
// Object.defineProperty(obj, prop, descriptor)
// This method allows a precise addition to or modification of a property on an object. 
// Normal property addition through assignment creates properties which show up during property enumeration (for...in loop or Object.keys method), 
// whose values may be changed, and which may be deleted. 
// This method allows these extra details to be changed from their defaults. 
// By default, values added using Object.defineProperty() are immutable.

// need to make name property writable to assign values to property otherwise the property will be immutable
let newEmployee = {id:22};

// configurable: Defaults to false.
// true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. 
// enumerable: Defaults to false.
// true if and only if this property shows up during enumeration of the properties on the corresponding object.
Object.defineProperty(newEmployee, 'name', {configurable:false, writable: false, enumerable: true})
newEmployee.name='pavan'

console.log(newEmployee.name) // undefined

Object.defineProperty(newEmployee, 'age', {configurable:false, writable: true, enumerable: false})
newEmployee.age=44
newEmployee.age=77

console.log(newEmployee.age) //77
######################################################
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
######################################################
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
// enumerable property determines whether the property or symbol can be accessed via for...in loop or spread operator or Object.assign or Object.keys
// To avoid inheritance, freeze the Object.prototype upfront, specify all options explicitly, or point to null 
// with Object.create(null).
// If a value is shared, then objects created using Object.defineProperty will read or write to the same value using accessor properties (get/set methods) and to the prototype properties too.
// unlike accessor properties, value properties will always be set on object itself but not on prototype. However, if a non-writable value property is inherited, it still prevents from modifying the property on the object.
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
delete a property in an object:
var personDetails:{
	name: 'person',
	age: 30
}

delete personDetails.age

Example:
const obj={
    height: 30
}
console.log(obj.height)
delete obj.height
console.log(obj.height)






























