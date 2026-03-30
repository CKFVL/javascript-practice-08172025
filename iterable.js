Built in iterables in javascript:
  - array
  - string
  - Map
  - Set
  - arguments object (function arguments)
  - TypedArray
  - NodeList

to check if an object is iterable in JS, check whether it defines [Symbol.iterator] method.
Simple check:
  const obj=[1,2,3]
  console.log(typeof obj[Symbol.iterator]==='function')

because array is iterable, the output is true.

Example with non-iterable object:
  const obj={name:'pavan', age:90}
  console.log(obj[Symbol.iterator]==='function') //output is false

Once an object implements Symbol.iterator, it works with:
  for...of
  spread operator ...
  Array.from()
  destructuring

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

Checking What the Iterator Returns
You can also inspect the iterator itself.

  const arr = [1,2];
  const iterator = arr[Symbol.iterator]();
  console.log(iterator.next());

Output:
{ value: 1, done: false }
########
function arguments is iterable in modern JS:
function test(){
  console.log(typeof arguments[Symbol.iterator] === "function");
}

test(1,2,3);

###########
Arrays, Maps, Sets are iterable because they implement Symbol.iterator.
Plain objects only support property enumeration, not iteration.

You can make an object iterable:
const user={
  name:'pavan',
  age: 30,
  [Symbol.iterator](){
    let entries=Object.entries(this)
    let index=0
    
    return {
      next(){
        if(index<entries.length){
          return {value:entries[index++], done: false}
        }    
        return {done:true}
      }
    }
  }
}

for(const item of user){
  console.log(item)
}
---
2. Cleaner Version Using Generator (Recommended)
A generator automatically creates the iterator.
