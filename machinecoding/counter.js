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
