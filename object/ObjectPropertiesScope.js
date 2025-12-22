Refer thisInDifferentEnvironment.js to understand the value of `this` in different environments
#################################################

*** Core rule to remember:
Variables (var, let, const) do not become object properties.
Only assignments to `this` do.

Key takeaways (important)
  -  In strict mode, this is undefined in normal function calls
    (In strict mode, this in a normal function without new is undefined)

  -  Constructor functions must be called with new (Calling a constructor without new breaks this)
    Local variables (var, let, const) are not object methods (Local variables ≠ object properties)
    (Local variables (like let say) cannot be accessed from outside the function)

  -  Missing let/var/const creates accidental globals

  -  Arrow functions inherit this, they don’t create their own
  -  Assigning to undeclared variables is forbidden

🔑 Rule to remember
If you want obj.method(), the method must be on the object (via this or return).
Always use new for constructor functions or return an object explicitly

Example:
function personRegular(name) {
  this.name = name;

  say = () => { // behaves same way with let, const
    console.log(this.name);
  };
}

const pr=personRegular('kumar')
pr.say()

What actually happens (non-strict mode):
1️⃣ personRegular('kumar') is called without new
So in non-strict mode:
this === globalThis   // window in browser, global in Node
That means:
this.name = name;
➡️ sets a global variable:
globalThis.name = "kumar"

In strict mode:
If a normal function is called without new, this is undefined
JavaScript does not auto-bind this to the global object
So here:
const pr = personRegular('kumar');
You are calling personRegular like a regular function, not a constructor.
Inside personRegular:
this === undefined

Then this line fails:
this.name = name; // ❌ TypeError

You’ll get:
TypeError: Cannot set properties of undefined

-------------------------------------------------
*** In non-strict mode:
say = () => { ... } (very important)
Because there is no let / var / const, this creates another global variable:

globalThis.say = () => {
  console.log(this.name);
};

Also, arrow functions:
❌ do NOT have their own this
✅ capture this lexically (from where they’re created)

So this inside say is the same this as in personRegular → globalThis.
3️⃣ Return value of personRegular
const pr = personRegular('kumar')

But personRegular returns nothing, so:
pr === undefined

4️⃣ The crash
pr.say()
❌ Error:
TypeError: Cannot read properties of undefined (reading 'say')

Because:
pr is undefined
say is actually global, not a property of pr

What does work (but is bad practice)
This would actually work:
say()
And it would print:
kumar
Because both name and say were accidentally made global.

*** In strict mode:
❌ Problem 1: this is undefined (strict mode)

You are calling the function without new:
const pr = personRegular('kumar');

In strict mode:
this inside a regular function = undefined
So this line crashes immediately:
this.name = name;

Error you get:
TypeError: Cannot set properties of undefined (setting 'name')
➡️ The function never finishes execution.

❌ Problem 2: say is an undeclared variable
This line:
say = () => { ... };

In non-strict mode, this would:
Create a global variable (bad but allowed)
In strict mode:
Assigning to an undeclared variable is illegal
Error:
ReferenceError: say is not defined

So even if the first error didn’t exist, this one would stop execution.
❌ Problem 3: pr is undefined
Because personRegular does not return anything:
const pr = personRegular('kumar');
// pr === undefined

So this line would fail anyway:
pr.say(); // TypeError
###################################################
function personRegular(name) {
  this.name = name;

  let say = () => {
    console.log(this.name);
  };
}

const pr = personRegular('kumar')
pr.say()

*** Non-strict mode:
What happens step by step (non-strict mode)
1️⃣ Function called without new
personRegular('kumar')
So:
this === globalThis   // window (browser)

This line:
this.name = name;

➡️ creates/overwrites a global property:
globalThis.name = "kumar"

2️⃣ say is block-scoped
let say = () => { ... }

say exists only inside personRegular
It is NOT attached to this
It is NOT returned

So once the function finishes, say is gone
3️⃣ Return value
const pr = personRegular('kumar')
personRegular returns nothing, so:
pr === undefined

4️⃣ The error
pr.say()
❌ Error:
TypeError: Cannot read properties of undefined (reading 'say')

*** Strict mode:
1️⃣ Problem 1: this is undefined
In strict mode, if you call a function without new, like this:
const pr = personRegular('kumar');
this inside personRegular is undefined
So this line:
this.name = name;
throws a TypeError:
TypeError: Cannot set properties of undefined (setting 'name')
This stops execution immediately.

2️⃣ Problem 2: say is just a local variable
You wrote:
let say = () => { console.log(this.name); };
say is not attached to this or the object
It exists only inside the function and disappears when the function finishes
So even if this worked, pr.say does not exist
Calling:
pr.say();
would give:
TypeError: Cannot read properties of undefined (reading 'say')

3️⃣ Problem 3: personRegular does not return anything
By default, a function returns undefined if you don’t explicitly return
So pr is actually undefined
This is another reason pr.say() fails.

#################################################
  function personRegular(name) {
  this.name = name;

  var say = () => {
    console.log(this.name);
  };
}

const pr = personRegular('kumar')
pr.say()

*** Non-strict mode:
Key point up front
👉 Using var instead of let does NOT attach say to this.
It is still just a local variable inside the function.

What happens step by step (non-strict mode)
1️⃣ Function is called without new
personRegular('kumar')
So:
this === globalThis   // window (browser)
This line:
this.name = name;

➡️ sets:
globalThis.name = "kumar"

2️⃣ var say
var say = () => {
  console.log(this.name);
};

var is function-scoped
say exists only inside personRegular
It is NOT attached to this
It is NOT returned
After the function ends, say is gone.

3️⃣ Return value
const pr = personRegular('kumar')
Since there is no return:
pr === undefined

4️⃣ The error
pr.say()

❌ Error:
TypeError: Cannot read properties of undefined (reading 'say')

*** Strict mode:
. What strict mode changes
In strict mode:
If a normal function is called without new, this is undefined
JavaScript does not auto-bind this to the global object
So here:
const pr = personRegular('kumar');

You are calling personRegular like a regular function, not a constructor.
Inside personRegular:
this === undefined

Then this line fails:
this.name = name; // ❌ TypeError

You’ll get:
TypeError: Cannot set properties of undefined

#######################################################
Correct way #1 — use new + regular method
function Person(name) {
  this.name = name;
  this.say = function () {
    console.log(this.name);
  };
}

const pr = new Person('kumar');
pr.say(); // kumar

Correct way #2 — arrow function (still okay here)
function Person(name) {
  this.name = name;
  this.say = () => {
    console.log(this.name);
  };
}

const pr = new Person('kumar');
pr.say(); // kumar

Correct way #3 — modern class (best)
class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(this.name);
  }
}

const pr = new Person('kumar');
pr.say(); // kumar

Correct way #4 — Return an object (factory pattern)
function personRegular(name) {
  return {
    name,
    say: () => {
      console.log(name);
    }
  };
}

const pr = personRegular('kumar');
pr.say(); // kumar
