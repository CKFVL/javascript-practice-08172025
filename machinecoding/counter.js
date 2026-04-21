// create a counter

// constructor function
function Counter(){
  let count=0;
  
  this.increment=function(){
    count++
    return count;
  }
  
  this.reset=function(){
    count=0
    return count
  }
}

let count=new Counter();
console.log(count.increment());
console.log(count.increment())

console.log(count.reset())

console.log(count.increment());
console.log(count.increment())
#########################

//  factory function
function Counter(){
  let count=0;
  
  return{
  increment(){
    count++
    return count;
  }
  ,
  reset(){
    count=0
    return count
  }
  }
}

let count=Counter();
console.log(count.increment());
console.log(count.increment())

console.log(count.reset())

console.log(count.increment());
console.log(count.increment())

#########################
// arrow function
// create a counter
function Counter(){
  let count=0;
  
  return{
  increment:()=>{
    count++
    return count;
  }
  ,
  reset:()=>{
    count=0
    return count
  }
  }
}

let count=new Counter();
console.log(count.increment());
console.log(count.increment())

console.log(count.reset())

console.log(count.increment());
console.log(count.increment())

// This still works, but new is useless here because returning {...} overrides new, so new is ignored
JS Internally does roughly this:
  1. let obj={} // create empty object
  2. obj.__proto__ = Counter.prototype; // link prototype
  3. let result = Counter.call(obj) // call function with this = obj

  4. if (result is object) return result;
      else return obj;


🔥 Rule (VERY IMPORTANT)
If a constructor returns an object, that object becomes the result of new.
If it returns a primitive (number, string, etc.), it is ignored.

Example 1: No return
  function A(){
    this.x = 10;
  }

  let obj = new A();
  console.log(obj.x); // 10

  👉 Since nothing is returned → JS returns this

Example 2: Returning object
  function A(){
    this.x = 10;
    return { y: 20 };
  }

  let obj = new A();
  console.log(obj); // { y: 20 }
  console.log(obj.x); // undefined

  👉 The { y: 20 } replaces the this object

Example 3: Returning primitive
  function A(){
    this.x = 10;
    return 100;
  }

  let obj = new A();
  console.log(obj.x); // 10

  👉 Primitive is ignored → fallback to this

Final takeaway
  new is not ignored
  It is conditionally overridden
  Returning an object = you take control
  Returning nothing/primitive = JS uses this
#############
IIFE:
const count=(()=>{
  let counter=0
  
  function inner(){
    counter++
    return counter;
  }
  
  inner.reset=function(){
    counter=0
    return counter;
  }
  
  return inner
  
})();

console.log(count())
console.log(count())
console.log(count())

console.log(count.reset())

console.log(count())
console.log(count())
console.log(count())
