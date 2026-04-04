// reduce: reads elements from left to right and produces a single value
// takes 4 arguments: total, value, index, array itself

let numbers1 = [45, 4, 9, 16, 25];
let total=numbers1.reduce(
  function(
    total //accumulator.reducer
  , currentVal, 
  currentIndex, 
  numbers1 // array itself
  ){
  return total+currentVal;
},
100 // initial value is optional
)

console.log(total)

// similarly reduceRight --> processes the array from right to left instead of left to right
const arr=[4,3,2,1]

let revSum=arr.reduceRight((acc, currVal, index, arr)=>{
  console.log(`acc:${acc}, value:${currVal}`)
  return acc+currVal
},0)  // initial value must be provided otherwise it'll prodcue inconsistent results

console.log(revSum)

---------
const arr=[[1,2],[3,4],[5]]
// instead of flattening and reversing array, use reduceRight (reverse order effect)
let rrarr=arr.reduceRight((acc, currVal, index, arr)=>{
  acc.push(...currVal)
  return acc
}, [])

console.log(rrarr)
---------
Function composition (common real use case)
const add = x=>x+2;
const multiply=x=>x*3;
const subtract=x=>x-3;

const funcs=[add, multiply, subtract]
let funcrev=funcs.reduceRight((acc, func, index, funcs)=>{
  let accval=func(acc)
  return accval;
},0)

console.log(funcrev)
