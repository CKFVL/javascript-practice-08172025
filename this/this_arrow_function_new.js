Refer thisInDifferentEnvironment.js to understand the value of `this` in different environments
######################################
*** only functions create scope, not objects.
function () { } → creates new this
() => { } → does NOT create new this
{ } object literal → does NOT create new this
##############
NOTE: Understand this first, this_regular_function_new.js and then read this page
##############
Arrow Function Syntax
When working with Arrow Functions, you have a couple of "syntax shortcuts" available.

Most importantly, you should know about the following alternatives:

1) Omitting parameter list parentheses
If your arrow functions takes exactly one parameter, you may omit the wrapping parentheses.

Instead of

(userName) => { ... }
you could write

userName => { ... }
Please note: 

If your function takes no parameters, parentheses must not be omitted - () => { ... } is the only correct form in that case.
If your function takes more than one parameter, you also must not omit parentheses - userName, userAge => { ... } would be invalid ((userName, userAge) => { ... } is correct)!

2) Omitting function body curly braces
If your arrow function contains no other logic but a return statement, you may omit the curly braces and the return keyword.
Instead of
  number => { 
    return number * 3;
  }
you could write
  number => number * 3; 

Arrow functions have two forms:
1) Implicit return:
  items.map(item => (
    <li>{item}</li>
  ));
  This is a single expression
  JavaScript automatically returns it

2) Block body → explicit return required
  items.map(item => {
    return <li>{item}</li>;
  });
  
!!!!*** {} creates a function block ***!!!!

  JavaScript assumes you’ll write statements
  You must use return
---
The following code would be invalid:
number => return number * 3; // invalid because return keyword must also be omitted!
number => if (number === 2) { return 5 }; // invalid because if statements can't be returned

3) Special case: Just returning an object
If you go for the shorter alternative explained in 2) and you're trying to return a JavaScript object, you may end up with the following, invalid code:
number => { age: number }; // trying to return an object
This code would be invalid because JavaScript treats the curly braces as function body wrappers (not as code that creates a JS object).

To "tell" JavaScript that an object should be created (and returned) instead, the code would need to be adjusted like this:

number => ({ age: number }); // wrapping the object in extra parentheses
By wrapping the object and its curly braces with an extra pair of parentheses, JavaScript understands that the curly braces are not there to define a function body but instead to create an object. 
  Hence that object then gets returned.

##########################
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/689c92ef-918c-8323-ab81-4d4b4d54cab4
✅ Key takeaway for arrow functions:
Arrow functions don’t have their own this.
In arrow functions, this is lexical — taken from the surrounding scope.
(Arrow functions capture this from their parent scope)
Arrow functions are the rebel children — they ignore `this` rule and just take this from where they were created/written
OR
  Key rule for arrow functions:
❌ Arrow functions do NOT have their own this
✅ They capture this lexically from where they are defined

example:
Where is this arrow function defined?
➡️ In the global scope, not inside obj’s execution context.
In non-strict mode (browser):
this === window

And earlier we had:
var fullname = "pavan kumar"
// → window.fullname

So:
this.fullname → window.fullname → "pavan kumar"

✅ Output
pavan kumar

⚠️ Even though it looks like a method, arrow functions never bind this to the object.
console.log(obj.getFullnameV2())
console.log(obj.getFullnameV3()) // error: getFullnameV3 is not a function, it already holds the returned value
---
✅ Key takeaway for regular functions:
this is not lexical in normal functions — it’s dynamic.

Here’s the one-line trick to instantly figure out this in any *** regular function call *** :
*** Look to the left of the dot when the function is called — that’s your this.
*** The object that actually calls the function decides what this will be inside that function.
*** If there’s no dot, this is the global object (or undefined in strict mode).
📌 Rule of thumb:
In regular functions, this is not fixed — it’s assigned at the moment the function is called, and the “assigner” is whoever is doing the calling.

*** In regular functions, this is dynamic (decided at call time)
*** In arrow functions, this is lexical (decided at creation time)

###############################
✅ Example 1: Arrow function inside object → does NOT bind this
const user = {
  name: "Pavan",
  getName: () => {
    console.log(this.name);
  }
};

user.getName(); // undefined
Why undefined?
this inside arrow function does NOT refer to user.
It refers to the outer scope (global), where name does not exist.
Object literals do not create their own scope.
Even though the arrow function is written inside the user object literal, the object itself does NOT create a scope.

*** only functions create scope, not objects.
function () { } → creates new this
() => { } → does NOT create new this
{ } object literal → does NOT create new this

Example:
const user={
  name: "Interview",
  regularFn: function(){
    console.log('regularFn', this.name)
  },
  arrowFn: () => {
    console.log("arrowFn:", this.name)
  }
};

user.regularFn();
user.arrowFn();

✅ Correct Rule
Arrow functions inherit this from the lexical (surrounding execution) scope, not from the object they are inside.
Object literals do not create their own scope.
So the getName arrow function’s surrounding scope is NOT user, but the global scope (or module scope).

👉 Visualizing the scope
const user = {          // ❌ does NOT create a new `this`
  name: "Pavan",
  getName: () => {      // ❗ arrow function binds this from OUTSIDE `user`
    console.log(this.name);
  }
};

user.getName();
🔍 Where is this arrow function created?
It’s created in the global scope, like this:

// global scope
const user = {
  name: "Pavan",
  getName: () => { console.log(this.name); }
};

So arrow function captures:
this = globalThis

Not the user object.

🔥 Why doesn’t the object become the parent scope?
Because only functions create scope, not objects.
function () { } → creates new this
() => { } → does NOT create new this
{ } object literal → does NOT create new this

And arrow functions don’t behave like methods.

Another example:
let length = 10;
const object = {
  length: 5,
  log: () => {
    console.log(this.length);
  },
};

object.log(); // output: 10

###############################
✅ Code
function Timer() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

new Timer();
✔️ First Key Point — Constructor call with new

When you call:
new Timer();
JavaScript does the following internally:
Creates a new empty object
→ {}
Sets this inside Timer() to that new object
→ this = {} (the new Timer instance)
It adds the property:
this.seconds = 0;
So now the object is:
{ seconds: 0 }

✔️ Second Key Point — Arrow function behavior
Arrow functions do NOT have their own this.

So in:
setInterval(() => {
  this.seconds++;
  console.log(this.seconds);
}, 1000);

The arrow function borrows this from the surrounding scope.
👉 The surrounding scope = the Timer constructor function.
And inside the constructor, this refers to the Timer instance.
So inside the arrow function:

this.seconds means:
the seconds property of the Timer instance

This is why the seconds update works correctly.
✔️ Third Key Point — What if you used a regular function?

If you wrote:
setInterval(function() {
  this.seconds++;
  console.log(this.seconds);
}, 1000);


Here, the callback is a regular function.
Regular functions get this from how they are called, not where they are created.
And setInterval() calls the callback without an object:
callback(); // no object to the left of .

So in a regular function:
this becomes the global object (window in browsers)
or undefined (in strict mode)

Thus:
this.seconds++   // ❌ would fail or modify window.seconds

✔️ Conclusion
Why does the arrow function work?
Because:
✔ Arrow functions capture this from their parent scope
✔ Parent scope = Timer constructor
✔ Timer constructor's this = Timer instance

So the arrow function’s this → the Timer object.
🎯 THE SIMPLEST SUMMARY
Arrow functions don’t have their own this.
They use the this of the place where they were created.

Here, the arrow function is created inside the constructor, so it inherits the constructor’s this → the Timer instance.

#############################
Arrow function inside class behaves same:
class Test {
  count = 0;

  increment = () => {
    this.count++;
    console.log(this.count);
  }
}

const t = new Test();
t.increment(); // 1

Arrow function increment captures this from the instance automatically.
#################
Arrow Function Created Here
          │
          ▼
Does arrow function have its own `this`?
  │
  └── No → Look one scope out
                 │
                 ▼
  Is this scope a regular function?
    │
    ├── Yes → Use that function's `this`
    │
    └── No → Keep climbing outward
                     │
                     ▼
    Did we reach global/module scope?
        │
        ├── Yes → Use global/module `this`
        └── No → Keep climbing...
#######################
Example 1 — Arrow inside a method
const person={
  name: 'pavan',
  regularFn: function(){
    const arrFn=()=>{
      console.log(`${this.name}`)
    }
    
    arrFn();
  }
}

person.regularFn()
arrowFn has no this of its own.
It takes this from regularFn’s scope.
In regularFn, this → obj, so arrowFn also sees obj.
---
Example 2 — Arrow at global level
const arrow = () => {
  console.log(this);
};

arrow(); // window (browser) or {} (Node)
---
Example 3 - 
function Timer() {
  this.seconds = 0; // OR seconds=0
  setTimeout(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
Timer() // works
---
Example 4 — Arrow in setTimeout
function Timer() {
  this.seconds = 0;
  setTimeout(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

new Timer();
// Works — arrow gets `this` from Timer’s constructor function scope

// If we used a regular function inside setInterval, this would be window or undefined.
function Timer() {
  this.seconds = 0;
  setTimeout(function(){
    this.seconds++; // Look to the left of the dot when the function is called - that's your this.
    console.log(this.seconds);
  }, 1000);
}

new Timer(); //NaN
