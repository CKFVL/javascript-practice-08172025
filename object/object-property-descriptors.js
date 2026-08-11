A property descriptor defines the characteristics/behavior of an object's property.
There are two types:
    | Type                    | Main fields                                       |
    | ----------------------- | ------------------------------------------------- |
    | **Data descriptor**     | `value`, `writable`, `enumerable`, `configurable` |
    | **Accessor descriptor** | `get`, `set`, `enumerable`, `configurable`        |
---
A JavaScript property descriptor defines how a property behaves. 
    A data descriptor uses value and writable, 
    while an accessor descriptor uses get and set; both can also have enumerable and configurable.
---
Data Descriptor:
    Stores an actual value.

    Object.defineProperty(emp, "name", {
        value: "Pavan",
        writable: true,
        enumerable: true,
        configurable: true
    });

Interview point:
    value → actual property value
    writable → can value be changed?
    enumerable → appears in Object.keys() / for...in?
    configurable → can property be deleted or descriptor attributes changed?

---
Accessor Descriptor:
    Doesn't directly store a value. It uses get and/or set.

    Object.defineProperty(emp, "fullName", {
        get() {
            return `${this.firstName} ${this.lastName}`;
        },

        set(value) {
            [this.firstName, this.lastName] = value.split(" ");
        },

        enumerable: true,
        configurable: true
    });
---
*** Key interview distinction: ***
    Data descriptor uses value/writable; accessor descriptor uses get/set.

Very Important Interview Question: Can we mix them? No.
    You cannot have:
        { // This results in a TypeError.
            value: "Pavan",
            get() { ... }
        }
    OR
        { // This results in a TypeError.
            writable: true,
            set(value) { ... }
        }

Remember:
    value + writable → Data descriptor
    get + set → Accessor descriptor
    Never mix the two.

---
Default Descriptors — Important Trap
Normal assignment:
    const obj = {};
    obj.name = "Pavan";

    is effectively:

    Object.defineProperty(obj, "name", {
        value: "Pavan",
        writable: true,
        enumerable: true,
        configurable: true
    });

But this:
    Object.defineProperty(obj, "name", {
        value: "Pavan"
    });

    defaults to:
    {
        value: "Pavan",
        writable: false,
        enumerable: false,
        configurable: false
    }

This is a very common interview question.
    obj.x = value → descriptor flags are generally true
    Object.defineProperty(obj, "x", { value }) → omitted flags are false
---
Object.create(null) — Important Clarification
You noted this correctly:
    const descriptor = Object.create(null);
    descriptor.name = "Pavan";
Object.create(null) means:
    The object has no prototype.
    So it doesn't inherit things like:
        toString()
        hasOwnProperty()

But this does NOT change property-descriptor defaults.
// writable: true, enumerable: true, configurable: true
const descriptor = Object.create(null);
descriptor.name = "Pavan";
console.log(Object.getPrototypeOf(descriptor) === Object.prototype)
const descprop=Object.getOwnPropertyDescriptor(descriptor, 'name')
console.log(descprop)

// Inspecting a Descriptor
// getOwnPropertyDescriptor: gets descriptors for all own properties.
// writable: true, enumerable: true, configurable: true
const obj={}
console.log(Object.getPrototypeOf(obj) === Object.prototype)
obj.name='guru';
const objdesc=Object.getOwnPropertyDescriptor(obj, 'name')
console.log(objdesc)

// writable: false, enumerable: false, configurable: false
const objdef={}
const objper=Object.defineProperty(objdef, 'name', {value:'gurupavan kumar'})
console.log(Object.getPrototypeOf(objper) === Object.prototype)
console.log(Object.getOwnPropertyDescriptor(objper, 'name'))

// writable: false, enumerable: true, configurable: false
const objfreeze=Object.freeze({name:'pavan'})
console.log(Object.getOwnPropertyDescriptor(objfreeze, 'name'))

So don't confuse:
    *** Prototype behavior ≠ Property descriptor behavior

configurable — Very Important
configurable: false means you cannot:
    delete the property
    change its enumerable
    change accessor configuration
    generally reconfigure the property

Example:
    Object.defineProperty(obj, "a", {
        value: 10,
        configurable: false
    });

    delete obj.a; // In strict mode, attempting the prohibited operation throws TypeError.

writable vs configurable: This is a common interview comparison.
    {
        writable: false,
        configurable: true
    }
means:
    Can't change the value through assignment.
    But because configurable is true, the property can still be reconfigured/deleted.

Whereas:
    {
        writable: false,
        configurable: false
    } // makes the property much more restricted.

enumerable:
    Controls whether a property participates in enumeration.
For example:
    Object.defineProperty(obj, "secret", {
        value: 123,
        enumerable: false
    });
Then:
    Object.keys(obj) won't include secret.

---
Getters/Setters Can Add Behavior:
A getter/setter can do more than simply return/store a value.

Your Archiver example demonstrates this:

set(value) {
    temperature = value;
    archive.push({ val: temperature });
}

Every assignment:
    arc.temperature = 11;
    arc.temperature = 13;
can trigger additional behavior.

Interview answer:
Accessors allow us to intercept property reads and writes and execute custom logic.

---
// A frozen object's properties cannot be modified/reconfigured/deleted through normal operations.
// writable: false, enumerable: true, configurable: false
Object.freeze():
    const objfreeze=Object.freeze({name:'pavan'})
    console.log(Object.getOwnPropertyDescriptor(objfreeze, 'name'))

---
How to delete a property:
    delete personDetails.age; // removes the property, assuming it is configurable.

---
There is no direct:
    Object.renameProperty()
To "rename":
    emp.fullName = emp.name;
    delete emp.name;