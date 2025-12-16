In JavaScript, call(), apply(), and bind() are methods available on every function. They allow you to control the value of this when a function is executed.

call() invokes the function immediately, allowing you to manually set this and pass arguments one by one.
  function greet(greeting, punctuation) {
    console.log(greeting + ' ' + this.name + punctuation);
  }
  
  const person = { name: 'Pavan' };
  
  greet.call(person, 'Hello', '!');

---
Example:
const piyush={
  name: "piyush garg",
  sayName: function(){
    console.log(this.name)
  }
}
const jhon={
  name: "John doe",
  sayName: function(){
    console.log(this.name)
  }
}
jhon.sayName().call(piyush) // The function jhon.sayName() itself returns undefined
TypeError: Cannot read properties of undefined (reading 'call')
    at Object.<anonymous> (/index.js:13:15)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain]
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
