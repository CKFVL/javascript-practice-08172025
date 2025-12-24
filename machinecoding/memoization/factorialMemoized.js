// function factorialFn(num, acc){
//   if(num<=1) return acc;
//     return num * factorialFn(num-1, acc)
// }

// const res=factorialFn(3, 1)
// const res2=factorialFn(3, 1)
// console.log(res, res2)

function factorialMemoized(){
  const cache={}
  
  return function f(n){
    if(n<=1) return 1;
    
    if(cache[n]){
      console.log('returning from cache')
      return cache[n]
    }
    
    cache[n]=n*f(n-1)
    return cache[n]
  }
}

const ff=factorialMemoized();
console.log(ff(5))
console.log(ff(5))