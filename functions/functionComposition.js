composition is a pattern where you combine multiple functions: where the output of one function becomes the input of another.
*** function composition is order-dependent.

compose(f,g,h)(x)=f(g(h(x)))
Why compose(f, g) is defined this way
  const compose = (f, g) => x => f(g(x))
  Read it as:
    Apply g first, then apply f to the result.

const double = x => x * 2;
const square = x => x * x;

const compose = (f, g) => (x) => f(g(x));

compose(square, double)(3); // square(double(3)) = 36

👉 Purpose:
Build complex logic from small functions

where as currying is function transformation (by splitting arguments) technique and not a composition pattern
*** Each function returns another function until all arguments are provided.
(refer currying_new.js)

function add(a){
  return function(b){
    if (b!=undefined){
      return add(a+b)
    }
    
    return a;
  }
}

const curried=add(2)
console.log(curried(3)())

//#########
// composition: if need to use multiple args, then functions need to apply currying
// ---
const sum=(a)=>b=>(a+b)
const multiply=(a)=>b=>(a*b)
const compose = (f, g) => x => f(g(x))

const result2 =
  compose(

    multiply(3),
    sum(4)
  )(4)

console.log(result2)

Step 1: Create the functions
  sum(4) returns b => 4 + b; So, sum(4)(x) = 4 + x
  Similarly,
  multiply(3) returns 3 * b; So, multiply(3)(x) = 3 * x

Step 2: Compose them
  compose(multiply(3), sum(4)) means x => multiply(3)( sum(4)(x) )

Notice the order:
  sum(4) runs first.
  Its result is passed to multiply(3).

Step 3: Pass 4
  compose(multiply(3), sum(4))(4)
  Substitute into the definition:
    multiply(3)( sum(4)(4) )
Evaluate inside out.
First:
      sum(4)(4) => 4+4 = 8
then  multiply(3)(8) => 3*8 = 24

  Input
    │
    ▼
    4
    │
    ▼
  sum(4)
    │
    ▼
  4 + 4 = 8
    │
    ▼
  multiply(3)
    │
    ▼
  3 × 8 = 24
    │
    ▼
  Output: 24
########################################################################
const square=(a)=>(a*a)
const composed =
  compose(
    sum(4),       // f
    compose(multiply(3), square)
  )

console.log(composed(4))

//#########
const composeFuncArray=(...fns)=>(...args)=>{
  const[lastFn, ...otherFns]=fns.reverse()
  // Only the rightmost function receives multiple arguments
  // ✔️ All others are unary (thanks to currying)
  let lastFnRes=lastFn(...args)
  
  for(const fn of otherFns){
    lastFnRes=fn(lastFnRes)
  }
  
  return lastFnRes
}

console.log(composeFuncArray(sum(2), multiply(4), square)(3))

// ############
const composeWithReduce=(...fns)=>(...args)=>
  fns.reduceRight((acc, fn, index)=>(
    // Only the rightmost function receives multiple arguments
  // ✔️ All others are unary (thanks to currying)
    index===fns.length-1? fn(...acc) : fn(acc)
  ),args)

console.log(composeWithReduce(sum(2), multiply(4), square)(3))
