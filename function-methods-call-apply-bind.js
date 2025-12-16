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
