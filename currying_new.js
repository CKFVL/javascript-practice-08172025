https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/693391c0-91e0-8320-98da-90fe817af68b

Currying is a functional programming technique/pattern in JavaScript where a function that takes multiple arguments is transformed into a sequence of functions, 
each taking one argument at a time.

*** currying is function transformation (by splitting arguments) technique and not a composition pattern
*** Each function returns another function until all arguments are provided.


*** Understanding summary:
transforms multiple args into a sequence of functions and each function returns another function until all args are provided.


🔥 Simple Definition
function f(a, b, c)
into
f(a)(b)(c)

const add = (a) => (b) => a + b;
add(2)(3); // 5

How it works: Currying follows closure i.e. Each function call must retain access to the previous arguments

✅ Why Use Currying? 
Currying is useful for:

✔ Reusability (create partially applied functions)
✔ Cleaner and more readable code
✔ Creating custom utility functions
✔ Functional composition
#####################################
📌 Basic Example (Manual Currying)
Normal function
function add(a, b) {
  return a + b;
}

Curried version
function add(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add(10)(20)); // 30
#####################################
📌 Real-World Example (Partial Application)

You can create specialized functions:

function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const double = multiply(2);
console.log(double(5)); // 10

const triple = multiply(3);
console.log(triple(5)); // 15

#####################################
📌 Infinite Currying Example
Useful for accumulating values:

function add(a) {
  return function (b) {
    if (b !== undefined) return add(a + b);
    return a;
  };
}

console.log(add(1)(2)(3)(4)()); // 10

function recursiveMultiply(a){
    return function(b){
        if(b!=undefined) return recursiveMultiply(a*b)
        return a;
    }
}
console.log(recursiveMultiply(2)(3)(6)())
#######################################
Order of Function Execution in Currying

In this curried function:

function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curry(1)(2)(3)); // 6

Order of invocation is:
**1 → a
2 → b
3 → c**

So the order is a → b → c, NOT c → b → a.

🔍 Why it’s a → b → c?

Because each pair of parentheses calls the next returned function.

Step by step:
Step 1: curry(1)
Calls outer function
Returns inner function function(b)
a = 1

Step 2: (2)
Calls the function returned from step 1
Returns another function function(c)
b = 2

Step 3: (3)
Calls the last returned function
c = 3

Finally returns a + b + c

🧠 So the binding order is:

a gets value first
b gets value next
c gets value last

Each inner function remembers the outer variables because of closures.

🧠 Mnemonic:

Currying always captures outermost argument first and innermost argument last.

👀 Visualization Using Colors
curry(1)(2)(3)
   |     |    |
   a     b    c

🧪 If we reversed the order?

If the functions were defined like this:

function reverse(a) {
  return function(c) {
    return function(b) {
      return a + b + c;
    };
  };
}

reverse(1)(3)(2); // still 6


Then the mapping would be:
a = 1
c = 3
b = 2

So order depends on how functions are nested, not the alphabetical order of parameters.

################
// way of constructing functions that allows partial application of a function's arguments
var greet = function (greeting, name) {
    console.log(greeting + ":" + name)
}
greet("hello", "pavan")

// instead with currying
var greetWithCurrying = function (greeting) {
    var namefn = function (name) {
        console.log(greeting + "," + name)
    }

    return namefn;
}
var namefnreturned = greetWithCurrying("hello")
namefnreturned("guru")
#########################
let greeting=function(firstname, lastname){
  console.log('firstname: '+firstname+', '+ 'lastname: '+ lastname)
}

greeting('pavan', 'bhogala')

var addFristName=function(firstName){
  var addLastName=function(lastName){
    console.log('firstname: '+firstName+', '+ 'lastname: '+ lastName)
  }
  return addLastName;
}

let af=addFristName('kumar')
af('bhogala')
#########################
// another example
var addTo = function (fpassed) {
    var add = function (inner) {
        return fpassed + inner;
    };
    return add;
};
var addwithinner = addTo(4); // here value of 4 is preserved in inner function
console.log(addwithinner(99));
#########################
Function composition: output of 1 function becomes input of another (chaining)

Currying: args are applied one at a time (delay or apply partial args)
Note: currying is not a composition pattern.

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/6968eb14-33e0-8325-a75f-47ba457a60ea

##############
