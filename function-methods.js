In JavaScript, call(), apply(), and bind() are methods available on every function. They allow you to control the value of this when a function is executed.

call() invokes the function immediately, allowing you to manually set this and pass arguments one by one.
  function greet(greeting, punctuation) {
    console.log(greeting + ' ' + this.name + punctuation);
  }
  
  const person = { name: 'Pavan' };
  
  greet.call(person, 'Hello', '!');
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
