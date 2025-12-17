In JavaScript, call(), apply(), and bind() are methods available on every function. They allow you to control the value of this when a function is executed.

call() invokes the function immediately, allowing you to manually set this and pass arguments one by one.
  function greet(greeting, punctuation) {
    console.log(greeting + ' ' + this.name + punctuation);
  }
  
  const person = { name: 'Pavan' };
  
  greet.call(person, 'Hello', '!');

---
Example:
const pavan = {
  name: "pavan kumar",
  sayName: function () {
    console.log(this.name)
  }
}

const guru = {
  name: "guru kumar",
  sayName: function () {
    console.log(this.name)
  }
}

guru.sayName().call(pavan) // The function jhon.sayName() itself returns undefined
Becomes:
undefined.call(pavan)
TypeError: Cannot read properties of undefined (reading 'call')
    at Object.<anonymous> (/index.js:13:15)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain]

.call() works on functions, not on the result of a function call
guru.sayName.call(pavan) // sayName is not invoked yet and output is pavan kumar

---
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/69419c87-83bc-8322-82df-2e913a6ac755
const pavan = {
    name: "pavan kumar",
    sayName: function () {
        console.log(this.name)
    }
}

setTimeout(pavan.sayName(), 3 * 1000)

What you EXPECT
After 3 seconds:
pavan kumar

What ACTUALLY happens
pavan.sayName() is executed immediately
Its return value (undefined) is passed to setTimeout

So effectively JS sees:
setTimeout(undefined, 3000)

That means:
sayName runs right now
setTimeout has nothing valid to call later

Why this happens
setTimeout expects a function reference, not a function call.

❌ Wrong:
setTimeout(pavan.sayName(), 3000)

✅ Right:
setTimeout(pavan.sayName, 3000)

But wait… there’s another problem 👇
The this problem
If you do:
setTimeout(pavan.sayName, 3000)

After 3 seconds, this will NOT be pavan.
Why?
Because sayName is called as a plain function, not as a method.

So:
this === window   // non-strict mode
this === undefined // strict mode

Result:
undefined

✅ Correct ways to fix it
✅ Option 1: Use bind

Best and cleanest 👌
setTimeout(pavan.sayName.bind(pavan), 3000)

✅ Option 2: Wrap in a function
setTimeout(() => {
    pavan.sayName()
}, 3000)

✅ Option 3: Store reference first
const fn = pavan.sayName.bind(pavan)
setTimeout(fn, 3000)

Key Takeaways 🧠
Never call the function inside setTimeout
setTimeout(fn, delay)   // ✔
setTimeout(fn(), delay) // ❌

this depends on how a function is called
obj.method() → this === obj
method() → this is lost

bind, arrow functions, or wrappers preserve this

Because sayName is called as a plain function, not as a method.
Exactly 👍
Let’s make that sentence precise and crystal-clear.

What “called as a plain function” means
In JavaScript, this is decided at call time, not where the function is defined.

Method call ✅
pavan.sayName()


Here:
The call site has an object before the dot

So:
this === pavan
Plain function call ❌
const fn = pavan.sayName
fn()
or internally what setTimeout does:
setTimeout(pavan.sayName, 3000)

// later...
pavan.sayName()  ❌ NO
sayName()        ✅ YES (plain function call)

Here:
There is no object before the dot

So:
this === window      // non-strict mode
this === undefined   // strict mode

That’s why this.name becomes undefined.
Your sentence, refined
“Because sayName is called as a plain function, not as a method.”

Translated precisely:
“The function loses its owning object because it is invoked without an object reference at the call site, so this no longer points to pavan.”

One-line rule to remember 🧠
Look at the call site, not the declaration.

obj.fn()  → this === obj
fn()      → this is lost

Why bind fixes it
setTimeout(pavan.sayName.bind(pavan), 3000)

bind permanently sets:
this === pavan

no matter how or where the function is called later.
##################
apply() is almost the same as call(), except it takes arguments as an array.
  greet.apply(person, ['Hi', '...']);
Output → Hi Pavan...
Useful when you already have arguments in an array.
##################
bind() does not invoke the function immediately.
Instead, it returns a new function with this permanently set (and optionally preset arguments). You can call it later.
  const greetPavan = greet.bind(person, 'Hey');
  greetPavan('?');


| Method  | Executes immediately? | Argument style    | Returns      |
| ------- | --------------------- | ----------------- | ------------ |
| `call`  | Yes                   | Individual values | Result       |
| `apply` | Yes                   | Array of values   | Result       |
| `bind`  | No                    | Individual values | New function |
