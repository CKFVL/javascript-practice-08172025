Spread: Expands an iterable (array, object, string) into individual elements
Example 1: Array Expansion
let arr1=[1,2,3]
let arr2=[3,...arr1,5]
console.log(arr2)

Example 2: Object expansion
let obj1={a:1, b:2}
let obj2={...obj1, c:3}

Example 3: function arguments
function sum(x, y, z){
  console.log(x+y+z)
}
sum(...[1,2,3])

#####################################
Rest: Collects all elements into single array or object
// array destructuring
let[first, ...restArr]=[1,2,3,4]
console.log(first)
console.log(restArr)

// object destructuring
let {a, ...restObj}={a:1, b:2, c:3}
console.log(a)
console.log(restObj)

function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
#####################################
