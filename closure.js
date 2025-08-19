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

inner() is lexically bound to the outer() function’s scope.
Even after outer() has finished executing, the inner() function retains access to count because it was declared inside outer().
This is possible because of closures, which are enabled by lexical binding.

Lexical binding is predictable: you can read the code and know what variables are accessible.
It is fundamental to understanding:
  Closures
  Arrow functions
  this context (especially in arrow functions)
  Scope chains
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

const newuser=new CreateUser('pavan')
console.log(newuser.checkPassword('secret123'))

---
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

---
4. Loop with Closure (using var) - classic trap
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output: 3 3 3 (not 0 1 2)

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
