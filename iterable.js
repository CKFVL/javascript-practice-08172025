to check if an object is iterable in JS, check whether it defines [Symbol.iterator] method.
Simple check:
  const obj=[1,2,3]
  console.log(typeof obj[Symbol.iterator]==='function')

because array is iterable, the output is true.

Example with non-iterable object:
  const obj={name:'pavan', age:90}
  console.log(obj[Symbol.iterator]==='function') //output is false
#####
Safe utility function:
function isIterable(obj){
  return obj!==undefined && obj!==null && typeof obj[Symbol.iterator]==='function'
}

const isNullIterable=isIterable(null)
console.log(isNullIterable)
const isArrayIterable=isIterable([1,2,3,4])
console.log(isArrayIterable)
const isObjectIterable=isIterable({name:'pavan', age:30})
console.log(isObjectIterable)
const isMapIterable=isIterable(new Map())
console.log(isMapIterable)
const isUndefinedIterable=isIterable(undefined)
console.log(isUndefinedIterable)
const isStringIterable=isIterable("pavan")
console.log(isStringIterable)