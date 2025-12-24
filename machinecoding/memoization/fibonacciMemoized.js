// 0,1,1,2,3,5,8,13,21,33
function fibonacciMemoized(){
  const cache={}
  
  return function fib(n){
    if(n<2) return n;
    
    if(cache[n]){
      console.log('returning from cache for', n)
      return cache[n]
    }
    console.log(n)
    cache[n]=fib(n-1)+fib(n-2)
    return cache[n]
  }
}

const fm=fibonacciMemoized()
console.log(fm(2))
console.log(fm(4))
// console.log(fm(3))
// console.log(fm(4))