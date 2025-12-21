Scopes in js: local, global, closure
---
Reference: https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6892b9bd-eb34-8331-87b6-c22ab37b994d
Lexical binding:
----------------
the scope of the variable is based on the physical structure of the code (i.e. where variables or functions are written) - called as lexical scope or static scope
Note: scope of the variable is determined by its position in the source code and the nested funtions have access to variables declared in the outer scope.

example:
-------
function outer(){
  let count=0;
  
  function inner(){
    count++;
    //console.log(count)
    return count;
  }
  console.log(count)
  return inner;
}

const outeddr=new outer()
console.log(outeddr())
console.log(outeddr())
console.log(outeddr())

✅ What’s happening:
inner() is lexically bound to the outer() function’s scope.
Even after outer() has finished executing, the inner() function retains access to count because it was declared inside outer().
This is possible because of closures, which are enabled by lexical binding.

Lexical binding is predictable: you can read the code and know what variables are accessible.
It is fundamental to understanding:
  Closures
  Arrow functions
  this context (especially in arrow functions)
  Scope chains

const outeddr=new outer() // constructor function: 
console.log(outeddr())
console.log(outeddr())
console.log(outeddr())

Above code has issue, check below for correct usage:
weird side-effect:
-	new creates an empty object, {}
-	it binds the empty object to `this` inside outer()
-	since you are not returning this and returning `inner`, the returned value overrides the newly-created object.

So you still get the inner function back.
So effectively:
const outr = new outer();   // outr === inner function

❗️ **Issue #2: Accessing outr.inner
outr is the inner function itself.
So:

console.log(outr);       // prints the function inner()
console.log(outr.inner); // undefined, because outr has no property "inner"

✔️ Correct usage of closure
function outer() {
    let counter = 0;

    function inner() {
        counter++;
        return counter;
    }

    return inner;
}

const outr = outer(); // without new
console.log(outr()); // 1
console.log(outr()); // 2
console.log(outr()); // 3

Output:
1
2
3
Each call increments the counter, and the value is preserved inside the closure.
#####
If you want an object-like API, use:

function outer() {
    let counter = 0;
    
    return {
        inner() {
            counter++;
            return counter;
        }
    }
}

const obj = outer();
console.log(obj.inner()); // 1
console.log(obj.inner()); // 2



---
Arrow functions also use lexical binding for this
function Timer() {
  this.seconds = 0; // if this is not used, then it prints NaN

  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}

Functions remember the scope in which they were defined, not where they are called.

##############
What is a closure?
closure is a function that retains access to its lexical scope even when the function is executed outside its original scope.

Closure = Function + Lexical Environment
  
closures are created when the function is defined i.e., at the function creation time not at the function execution time
  example:
  -------
  function outer(){
    let count=0;
    
    function inner(){
      count++;
      //console.log(count)
      return count;
    }
    console.log(count)
    return inner;
  }
  
  const outeddr=new outer()
  console.log(outeddr())
  console.log(outeddr())
  console.log(outeddr())

Why it works:
inner() is a closure that remembers count even after outer() is done.

##############
Concept	        Meaning
Closure	        Function + access to outer scope variables, even after outer function is done
Created when	  A function is defined (not executed)
Enables	        Data hiding, currying, memoization, function factories, module patterns
##############
Closures examples:
-----------------
Data Privacy/Encapsulation:
---------------------------
function CreateUser(name){ // A factory function is any function that returns a new object (instance), without using the new keyword or a class.
  let secret='secret123';
  
  return{
    getName: () => name,
    checkPassword: (guess) => guess===secret // Function + access to outer scope variables
  };
  
}

const user=CreateUser('pavan')
console.log(newuser.checkPassword('secret123'))

---
Function factory:
function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
---
3. Loop with Closure (using let)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 0 1 2 (after 1 second)

What happens:
let is block-scoped
Each iteration creates a new binding of i
Each setTimeout callback closes over its own i

{
  let i = 0;
  setTimeout(() => console.log(i), 1000);
}
{
  let i = 1;
  setTimeout(() => console.log(i), 1000);
}
{
  let i = 2;
  setTimeout(() => console.log(i), 1000);
}

---
4. Loop with Closure (using var) - classic trap
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3 3 3 (not 0 1 2)

What happens:
var is function-scoped
Only ONE i exists
All callbacks reference the same i
By the time callbacks run:
i === 3

Conceptually:
var i;
i = 0; setTimeout(() => console.log(i), 1000);
i = 1; setTimeout(() => console.log(i), 1000);
i = 2; setTimeout(() => console.log(i), 1000);
i = 3; // loop ends

Fix using closure:
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 1000);
  })(i);
}

What’s happening?
var i is function-scoped, so without extra work, all setTimeout() callbacks would share the same i, which ends up as 3 after the loop — giving 3,3,3.
To capture the value of i on each iteration, we wrap the setTimeout in an IIFE:

(function(j){ ... })(i)

The current i is passed as an argument into the IIFE.
Inside the IIFE, it becomes the parameter j.
j is now a new, separate variable for each iteration.

This older pattern (var + IIFE) was commonly used before let/const existed to create block scoping.
Today, you can achieve the same much more cleanly using let:

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}

---
Counter Module pattern:
function counterFn(){
  let count=0;

  return {
    increment: ()=> ++count,
    decrement: ()=> --count,
    getCount: ()=> count
  }
}
const counter=new counterFn();
console.log(counter.increment())
console.log(counter.getCount())
console.log(counter.decrement())
---
Counter Module Pattern
const Counter = (function () {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count,
  };
})();

console.log(Counter.increment()); // 1
console.log(Counter.increment()); // 2
console.log(Counter.get()); // 2
---
setTimeOutClosure:
function delayedMessage(msg, delay) {
  setTimeout(() => {
    console.log("Message:", msg);
  }, delay);
}

delayedMessage("Hello", 2000); // remembers msg after 2 sec
---
8. Currying with Closures
function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curry(1)(2)(3)); // 6

---
var counter = (function () {
    var i = 0;
    return {
        get: function () { // equivalent to get() in ES6 called as method notation
            return i;
        },
        set: function (val) {
            i = val;
        },
        increment: function () {
            i++;
        }
    }
}
)();

console.log(counter.get())
counter.set(99)
console.log(counter.get())
counter.increment()
console.log(counter.get())
---
// another example:
'use strict'

var fibonacci = function() {
  var pre = 0,
    cur = 1;
  return {
    next: function() { //equivalent to next() in ES6 called as method notation
      var tmp = pre;
      pre = cur;
      cur += tmp;
      return cur;
    }
  };
}();

for (;;) {
  var limit = fibonacci.next()
  if (limit > 50) {
    console.log(limit)
    break;
  }
}

// above example in another way
'use strict'

var fibonacci = {
  generate: function() { //equivalent to generate() in ES6 called as method notation
    var pre = 0,
      cur = 1;
    return {
      next: function() { //equivalent to next() in ES6 called as method notation
        var tmp = pre;
        pre = cur;
        cur += tmp;
        return cur;
      }
    };
  }()
};

for (;;) {
  var limit = fibonacci.generate.next()
  if (limit > 50) {
	  console.log(limit)
    break;
  }
}

