Understanding summary:
  -  both are used to copy properties from 1 or more objects into a target object
  -  Object.assign mutates target, Spread never mutates
  -  Object.assign returns target object, Spread returns new object
  -  Object.assign ignores when source is null or undefined while Spread throws error.
  -  both copy only enumerable own properties and performs shallow copy
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/694695db-2c48-8321-a008-36904495ae0d

1-Line Interview Answer 💡
Object.assign mutates the target object, while spread always creates a new object. 
  Both do shallow copies of enumerable own properties, but Object.assign safely ignores null and undefined.
-----------------------
1. Basic Purpose (Same Goal)

Both are used to copy properties from one or more objects into a target object.

const a = { x: 1 };
const b = { y: 2 };

Object.assign({}, a, b);
// { x: 1, y: 2 }

{ ...a, ...b }
// { x: 1, y: 2 }

2. Mutation (❗ Key Interview Point)
Object.assign → mutates the target
const target = {};
Object.assign(target, { a: 1 });

console.log(target); // { a: 1 }

Spread → never mutates
const result = { ...{ a: 1 } };


📌 If you pass an existing object as target, Object.assign mutates it. Spread always creates a new object.

3. Return Value
Feature	Object.assign	Spread
Returns	Target object	New object
Mutates	Yes (target)	No
const obj = { a: 1 };
const result = Object.assign(obj, { b: 2 });

obj === result; // true

4. Handling null and undefined
Spread ❌ throws error
{ ...null }       // ❌ TypeError
{ ...undefined }  // ❌ TypeError

Object.assign ✅ ignores them
Object.assign({}, null, undefined);
// {}


📌 Real interview trick question

5. Property Copying Behavior (Same for Both)

Both:

Copy only enumerable own properties

Perform shallow copy

Override properties from left → right

const obj = { a: 1, a: 2 };

Object.assign({}, obj); // { a: 2 }
{ ...obj }              // { a: 2 }

6. Getters Execution (Subtle Difference)

Both invoke getters, but order differs slightly in complex cases.

const source = {
  get x() {
    console.log("getter called");
    return 10;
  }
};

Object.assign({}, source);
// getter called

{ ...source };
// getter called


📌 Behavior is effectively the same for most use cases.

7. Prototype Handling (Important!)

❌ Neither copies prototype

const obj = Object.create({ protoProp: 1 });
obj.a = 10;

Object.assign({}, obj); // { a: 10 }
{ ...obj };             // { a: 10 }


If prototype matters → neither is suitable.

8. Symbols (Often Missed)

Both copy enumerable Symbol properties.

const sym = Symbol("id");
const obj = { [sym]: 1 };

Object.assign({}, obj); // { [Symbol(id)]: 1 }
{ ...obj };             // { [Symbol(id)]: 1 }

9. Performance & Readability
Aspect	Object.assign	Spread
Readability	Verbose	Cleaner
ES Version	ES6	ES2018
Functional style	❌	✅

📌 Modern JS prefers spread for immutability

10. When to Use What (Interview Summary)
✅ Use spread when:

Writing modern ES code

Want immutability

Creating new objects (React / Redux style)

const newState = { ...state, loading: false };

✅ Use Object.assign when:

You need to mutate an existing object

You must safely handle null/undefined

Working in older environments

Object.assign(existingConfig, defaults);
