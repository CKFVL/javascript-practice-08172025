function memoize(fn){
  const cache={};

  return function(...args){
  // memoization should happen per function call, based on the function args, not at creation time
  // because JSON.stringify(fn) --> undefined
  const key=JSON.stringify(args)
  console.log(cache[key])
    //if(cache[key]){ fails for falsy values (0, false, null, '', undefined, [])
    if(key in cache){
      console.log('returning from cache', cache[key])
      return cache[key]
    }

    console.log('not found in cache')
    const result=fn.apply(this, args) 
    cache[key]=result
    return cache[key]
  }
  
}

function add(a,b){
  return a+b
}

const memoizedAdd=memoize(add)

console.log(memoizedAdd(2,3))
console.log(memoizedAdd(3,3))
console.log(memoizedAdd(2,3))

// ##################

function factorialFn(num, acc){
  if(num<=1) return acc;
    return num * factorialFn(num-1, acc)
}

console.log(memoizedAdd(factorialFn(5,1)))
console.log(memoizedAdd(factorialFn(5,1)))
console.log(memoizedAdd(factorialFn(5,1)))