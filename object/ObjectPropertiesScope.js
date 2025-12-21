Core rule to remember

Variables (var, let, const) do not become object properties.
Only assignments to `this` do.

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
