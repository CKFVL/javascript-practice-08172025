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
