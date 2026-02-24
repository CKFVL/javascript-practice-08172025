https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/699d0a1a-2478-8323-87b3-a03ce8d55830

'use strict'
//If an accessor property is inherited, its get and set methods will be called when the property is accessed 
// and modified on descendant objects.
// Accessor Property on Prototype
function Person() {}

Object.defineProperty(Person.prototype, "age", {
  get() {
    console.log("Getter called");
    return this._age;
  },
  set(value) {
    console.log("Setter called");
    this._age = value;
  },
  enumerable: true,
  configurable: true
});

const p = new Person();
// When You SET the Property
p.age = 30;

What happens?
p does NOT have its own age
JS checks prototype → finds accessor property
Since it’s a setter, it calls it

Output:
Setter called
Now _age is created on p.

// another object
const p2=new Person()
p2.age=99
---
When You GET the Property
console.log(p.age);

Flow:
p has no own age
Prototype has getter
Getter is executed with this = p

Output:
Getter called
30

🔥 Key Rule
    If an accessor property is inherited:
    get() runs when reading
    set() runs when writing
    this refers to the actual object (p), not the prototype
    That’s the important part.
---
🔹 Compare With Value Property
Now compare with a value property:
function Person() {}
Person.prototype.age = 25;
const p = new Person();
p.age = 40;

Here:
Assignment creates a new age property directly on p
It does NOT modify prototype’s age

So:
console.log(p.age);              // 40
console.log(Person.prototype.age); // 25

Because value properties are overridden.
🧠 Why Accessors Behave Differently

When assigning:
If prototype property is a data property, JS creates a new own property.
If prototype property is an accessor with setter, JS calls the setter instead.
#######

// If these methods use a shared variable to store the value, this value will be shared by all objects.
function myFn(){
  
}

let value;
Object.defineProperty(myFn.prototype, 'x', 
  {
    get(){
      return value
    },
    set(newval){
      value=newval
    }
  }
)

let a=new myFn()
let b=new myFn()
a.x=1

console.log(a.x)
console.log(b.x)
console.log(myFn.prototype.x)

console.log('###########')
//This can be fixed by storing the value in another property. In get and set methods, this points to the object which is used to access or modify the property.
Object.defineProperty(myFn.prototype, 'y',
{
  get(){
    return this.stored_y;
  },
  set(newY){
    this.stored_y=newY
  }
}
)
a.y='newwwwwwY'
console.log(a.y)
console.log(b.y)

b.y='hghjgh'
console.log('######## hghjgh')
console.log(a.y)
console.log(b.y)

console.log(myFn.prototype.y)
console.log(myFn.prototype.stored_y)
console.log('###########')
myFn.prototype.z=999
console.log(a.z)
console.log(b.z)
console.log(myFn.prototype.z)
console.log('###########')
//Unlike accessor properties, value properties are always set on the object itself, not on a prototype.
Object.defineProperty(myFn, 'abc',{
  writable: false,value:2345
})
console.log(a.abc)
console.log(b.abc)
// Instances (a, b) look at:
// Their own properties
// Their prototype (myFn.prototype)
// Up the prototype chain
// They do NOT look at the constructor function object (myFn).
console.log(myFn.prototype.abc)
console.log(myFn.abc)// Because:

// // However, if a non-writable value property is inherited, it still prevents from modifying the property on the object.
myFn.abc='12345'