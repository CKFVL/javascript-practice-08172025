1_waysToCreateArray.js
2_array-from.js
---
Arrays in JavaScript are objects.
Therefore, you can attach arbitrary properties to them and it doesn't affect length of the array.
  const arr = [];
  arr.name = 'pavan';
  console.log(typeof arr);       // "object"
  console.log(Array.isArray(arr)); // true
  console.log(arr.length) // 0

However, this is generally not recommended if you want key-value data. Use an object instead:
  const person = {
      name: 'pavan',
      age: 20,
      phone: 7095340538
  };
---
Adding elements with high indexes can create undefined "holes" in an array:
newcars[10] = "7car";
---
difference between array and object
array: numbered index
object: named index
---
There is no need to use the JavaScript's built-in array constructor new Array().
// The new keyword only complicates the code. It can also produce some unexpected results:
var points = new Array(40, 100); // Creates an array with two elements (40 and 100)
console.log(points);
// What if I remove one of the elements?
var points = new Array(40); // Creates an array with 40 undefined elements !!!!!
console.log(points);
---
Array methods: pop, push, shift (deletes element at beginning), unshift (adds element at beginning), delete, 
  find
  slice
  splice
  sort
  reverse
  map
  filter
  reduce
  every

// add element to array
newcars.push("newcar1");

// Adding elements with high indexes can create undefined "holes" in an array:
newcars[10] = "7car";

// Array methods:
//pop : removes last element of array
console.log(fruits.pop());
//push: pushes element at the end of array
console.log(fruits.push("hgk"));
//shift: similar to pop, but removes first element and shifts the elements to lower indexes
// returns the element that was removed
console.log(fruits.shift());
//unshift : similar to push, but it adds the element at the 0th index and shifts all other elements to upper indexes
console.log(fruits.unshift("seiurhew"));
//toString
console.log(fruits.toString());

// changing elements

// deleting elements: Using delete leaves undefined holes in the array. Use pop() or shift() instead.
delete fruits[0];
console.log(fruits.toString());
---
sort function sorts array values as strings
can produce wrong sorting for numbers, so use comapre function instead
####################
Array doesn't actually contain values, it refers to the values in memory and called as reference
const array1=[1,2,3] // array1 contains the reference of the values
const array2=array1 // array2 contains the copy of reference which array1 references

array2.push(5) // both references have 4 values now

console.log([]==[])
console.log([]===[])
In JSON, arrays are objects and objects are compared by the reference (memory address), not by value
[] === []
They are not. Each [] creates a new array instance, so:
[]  → object #1
[]  → object #2

Different references ⇒ false
check coercion rules - coercion rules apply only when the object types are different.

Quick mental model:
  Primitive → compared by value
  Object (arrays, objects, functions) → compared by reference
###############
indexOf: returns index of element occurence
findIndex: accepts a function
e.g. console.log(arr.findIndex(x=>x===99))
  How findIndex() works
  Array.prototype.findIndex() expects a callback function that returns a boolean:

  arr.findIndex((element, index, array) => {
    return condition; // true or false
  });

  It returns the index of the first element where the callback returns a truthy value.
  If nothing matches, it returns -1.

  hobbies.findIndex((item) => {
    return item === 'sports'
    }
  )
#####################
Adding elements with high indexes can create undefined "holes" in an array:
newcars[10] = "7car";

#####################
Array doesn't actually contain values, it refers to the values in memory and called as reference
e.g.
  const array1=[1,2,3] // array1 contains the reference of the values
  const array2=array1 // array2 contains the copy of reference which array1 references

  array2.push(5) // both references have 4 values now
  console.log(arr1) // [1,2,3,5]

sliceVsSpread.js:
------------------
to have a copy of the reference, use slice()
  const arr3=array1.slice()
  arr3.push(8989)
  console.log(arr1) // [1,2,3,5]
  console.log(arr3) // [1,2,3,5, 8989]  

  const slicedarr2=arr3.slice(1)
  console.log(arr1) // [1,2,3,5]
  console.log(slicedarr2) // [2,3,5]
###########################
// Associative Arrays (with named indexes): js doesn't support; arrays always use numbered indexes.
// After that, some array methods and properties will produce incorrect results.
var person = [];
person["firstName"] = "John";
person["lastName"] = "Doe";
person["age"] = 46;
var pl = person.length; // person.length will return 0
console.log(pl);
var pf = person[0]; // person[0] will return undefined
console.log(pf);

// difference between arrays and objects
// arrays use numbered indexes
// objects use named indexes
// Arrays are a special kind of objects, with numbered indexes.
// You should use objects when you want the element names to be strings (text).
// You should use arrays when you want the element names to be numbers.

// Avoid new Array()
// There is no need to use the JavaScript's built-in array constructor new Array().
// Use [] instead.
var points = new Array(); // Bad
var points = []; // Good

// The new keyword only complicates the code. It can also produce some unexpected results:
var points = new Array(40, 100); // Creates an array with two elements (40 and 100)
console.log(points);
// What if I remove one of the elements?
var points = new Array(40); // Creates an array with 40 undefined elements !!!!!
console.log(points);

// How to Recognize an Array
// The problem is that the JavaScript operator typeof returns "object":
var points = new Array(40, 100);
console.log(typeof points); // object
console.log(points instanceof Array); // true
console.log(Array.isArray(points)); // true
console.log(points.constructor === Array); // true

var arrpoints = [40, 100];
console.log(typeof arrpoints); // object
console.log(arrpoints instanceof Array); // true
console.log(Array.isArray(arrpoints));// true
console.log(arrpoints.constructor === Array);// true

//-------------------------------------------------------------
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(typeof fruits); // returns object

// use Array.isArray() to determine array type
console.log(Array.isArray(points));
// OR use instanceof; instanceof operator returns true if an object is created by a given constructor:
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits instanceof Array); // returns true

console.log("##########");
console.log(fruits.constructor === Array);
##########################
Arrays in Javascript are Objects:
const arr=[12,3,4]
console.log(typeof arr) // "object"

Internally it behaves like an object with numeric keys:
  {
    "0": 10,
    "1": 20,
    "2": 30
  }
 what happens if you use named indexes:
 const arr=[4,5,6]
 arr.name='pavan'
 console.log(arr) //Output: [1,2,3,name:"pavan"]
The array still remains an array.
console.log(Array.isArray(arr)); // true

Important Difference: Not Part of Array Elements
Named properties:
  Do not affect length
    const arr = [1,2,3];
    arr.name = "pavan";
    console.log(arr.length); // Output: 3

  Are not iterated by array methods
    arr.forEach(v => console.log(v)); // Output: 1,2,3

  Are ignored by many array operations

Bad practice:
  const arr = [];
  arr["name"] = "pavan";

Better:
  const obj = {};
  obj.name = "pavan";
#########################
to get values from an array, destructuring can be used instead of indexes 
  const [firstValue, secondValue]=[1,2,3] // where firstValue=1, secondValue=2

const nameArray=["Max", "Pavan"]
const firstName=nameArray[0]
const lastName=nameArray[1]
destructure array:
const [firstName, lastName]=["Max", "Pavan"]
###############
Any value can be stored in an array
e.g. [1, 'hello', true, {name: 'socks'}, [1, 2] ]

console.log(typeof [1, 'hello', true, {name: 'socks'}, [1, 2] ]) //object
console.log(typeof [1,2]) //object
console.log(Array.isArray([1, 'hello', true, {name: 'socks'}, [1, 2] ])) // true
console.log(Array.isArray([1,2])) // true
###############
var fruitslc = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

// get elements within a range(startIndex, endIndex-1)
let slicedArray=fruitslc.slice(1,4)
console.log(slicedArray.length)

let slicedArray2=fruitslc.slice(1,2)
console.log(slicedArray2.length)

fruitslc.forEach(f=> console.log(f))
//
// get elements within a range(startIndex, endIndex-1) and removes elements from source array
console.log('############')
let splicedArray=fruitslc.splice(1,4)
fruitslc.forEach(f=> console.log(f))

splicedArray.forEach(f=>console.log(f))

########################
// slice: slices out a piece of an array to new array and doesn't remove any elements from source array
// a way of achieving immutability
var fruitslc = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruitslc.slice(1)); // slices out elements starting from 1
console.log(fruitslc.toString());
console.log(fruitslc.slice(1, 3)); // slices out elements starting from 1 to 3
console.log(fruitslc);
########################
let fruitslc = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let slicedFruits=fruitslc.slice(2, 4)// startIndex, endIndex-1
slicedFruits.forEach(sf=> console.log(sf))
console.log(fruitslc)
console.log('##########')
let splicedFruits=fruitslc.splice(2, 4)// startIndex, endIndex
splicedFruits.forEach(sf=> console.log(sf)) // Lemon, Apple, Mango
console.log(fruitslc) // Banana, Orange
console.log('$$$$$$$$$$$$$$$')
let fruitsnew = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruitsnew.length) // 5
let fruitslc2 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let splicedFruitsww=fruitslc2.splice(1,0, "kiwi", "watermelon") // 1,0 means, don't delete any elements
splicedFruitsww.forEach(f=>console.log(f)) //  output: nothing
console.log('%%%%%%%%%%%%%%%%%%%%%%%%')
fruitslc2.forEach(f=>console.log(f)) // Banana, kiwi, watermelon, Lemon, Apple, Mango
console.log('@@@@@@@@@@@@@')
let splicedFruitsNew=fruitsnew.splice(1,3, "kiwi", "pomegranate", "jackfruit")
splicedFruitsNew.forEach(fr=> console.log(fr)) // Orange, Lemon, Apple
console.log('##########')
fruitsnew.forEach(fn=>console.log(fn)) //  Banana, kiwi, pomegranate, jackfruit, Mango

########################
//concat:
two or more arrays can be combined to a new array
const arr1=[1,2]
const arr2=[3,4]

console.log(arr1.concat(arr2))
---
const a = [1];
const b = [2];
const c = [3];

const result = a.concat(b, c);

console.log(result); // [1, 2, 3]
---
Mixing Values and Arrays:
const arr = [1, 2];
const result = arr.concat(3, [4, 5]);

console.log(result); // [1, 2, 3, 4, 5]

---
Nested Arrays (No Deep Flatten):
const arr1 = [1];
const arr2 = [[2, 3]];
const result = arr1.concat(arr2);

console.log(result); // [1, [2, 3]]

Using Spread Instead (Modern Alternative)
const arr1 = [1, 2];
const arr2 = [3, 4];

const result = [...arr1, ...arr2];

console.log(result); // [1, 2, 3, 4]
########################
// Sorting arrays
// sort function sorts array values as strings
console.log(fruitslc.sort());
console.log(fruitslc.reverse());
// can produce wrong sorting for numbers, so use comapre function instead
var points = [40, 100, 1, 5, 25, 10];
points.sort(function (a, b) {
  return a - b; // ascending
});
// The Compare Function
// The purpose of the compare function is to define an alternative sort order.
// The compare function should return a negative, zero, or positive value, depending on the arguments:
// function(a, b){return a - b}
// When the sort() function compares two values, it sends the values to the compare function, and sorts the values according to the returned (negative, zero, positive) value.
// If the result is negative a is sorted before b.
// If the result is positive b is sorted before a.
// If the result is 0 no changes is done with the sort order of the two values.
########################
// find the max and min value in array
// there is no out of box method to find max or min value in array, instead sort the array first and get the
// first or last element based on sorting order
// OR
// use Math.max or Math.min
// Math.max.apply to find the highest number in an array
var pointsMathMax = [40, 100, 1, 5, 25, 10];
function myArrayMax(arr) {
  return Math.max.apply(null, arr);
}
console.log(myArrayMax(pointsMathMax)); // 100

function myArrayMin(arr) {
  return Math.min.apply(null, arr);
}
console.log(myArrayMin(pointsMathMax)); // 1

// sort object arrays
var cars = [
  { type: "Volvo", year: 2016 },
  { type: "Saab", year: 2001 },
  { type: "BMW", year: 2010 }
];
cars.sort(function (a, b) {
  return a.year - b.year;
});
console.log(cars.toString());
cars.forEach(function (car, index, array) {
  console.log(car);
});

// arrayOfObjectsSortByKey = (arrayOfObjects, key) => {
//   return arrayOfObjects.sort((a, b) => {
//     let x = a[key].toLowerCase();
//     let y = b[key].toLowerCase();
//     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//   });
// };
########################
// Array iteration
//forEach: takes 3 values-callback function takes (value, index & array itself)
########################
// map: creates a new array for each element that it performs a function
// doesn't change source array
// callback function takes (value, index & array itself)
var numbers1 = [45, 4, 9, 16, 25];
var numbers2 = numbers1.map(function (n, i, numbers1) {
  return n * 2;
});
console.log(numbers1);
console.log(numbers2);
########################
// filter: creates a new array for each element that it performs a function
// doesn't change source array
// -callback function takes (value, index & array itself)
var filteredNumbers = numbers2.filter(function (n, i, numbers2) {
  return n > 32;
});
console.log(filteredNumbers);
########################
// every : checks every element and true if all pass a test
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);

function myFunction(value) {
  return value > 18;
}

console.log(allOver18);

const arr=[7,7,7,7,7]
console.log(arr.every((e)=>{
    if(e===7){
        return true
    }
}))

const arr2=[7,6,7,7,7]
console.log(arr2.every((e)=>{
    if(e===7){
        return true
    }
}))

const somearr=[6,6,6,6]
console.log(somearr.some((e)=>{
    if(e===7){
        return true
    }
}))

const somearr2=[7,7,6,7,7]
console.log(somearr2.some((e)=>{
    if(e===6){
        return true
    }
}))
########################
// indexOf: searches for element and returns the element's index
// lastIndexOf: searches from end of array
// find(): returns the first element that passes a test
// findIndex: returns the index of first element that passes a test
const arr=[2,5,8,4,8,9]
console.log(arr.indexOf(8))
console.log(arr.lastIndexOf(8))

// find() → returns the element if found, otherwise undefined.
console.log(arr.find((e, index, arr)=>{
    return e===7
})) // undefined

var numbers = [4, 9, 16, 25, 29];
var first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}

console.log(first); // if value > 188 returns undefined
// ################################################################
let spArray = []
spArray.push(...newArr) //use spread for copying array
spArray.forEach(printNum)


// export const upperCaseToTitleCase = (string) => {
//   return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// };

// export const removeEmpty = (obj) =>{
//   let objectToBeCleaned = {...obj};
//   Object.keys(objectToBeCleaned).forEach((key) => (objectToBeCleaned[key] == null || objectToBeCleaned[key] == "") && delete objectToBeCleaned[key]);
//   return objectToBeCleaned;
// };

// export const typeAheadFilterBy = (option, props, filterOption) =>{
//   let typedText = props.text.replace(/[^a-zA-Z0-9 ]/g, "-").toLowerCase();
//   let filter = option[filterOption].replace(/[^a-zA-Z0-9 ]/g, "-").toLowerCase();
//   if(filter.includes(typedText)){
//       return filter;
//   }
// };

// use spread to add elements at beginning and end of array
var myarray=[1,2,3,4,5]
myarray=[0,...myarray,6]

// #######################################################################
// When you delete an array element, the array length is not affected. 
// This holds even if you delete the last element of the array. 
// When the delete operator removes an array element, that element is no longer in the array. 
// In the following example, trees[3] is removed with delete.
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
if (3 in trees) {
    // this is executed
    console.log("element exists")
}

delete trees[3];
if (3 in trees) {
    // this is not executed
    console.log("element exists")
}

// If you want an array element to exist but have an undefined value, use the undefined value instead of the delete operator. In the following example, trees[3] is assigned the value undefined, but the array element still exists:
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
trees[3] = undefined;
if (3 in trees) {
    // this is executed
    console.log("element is ", trees[3])
}

// If instead, you want to remove an array element by changing the contents of the array, use the splice method. In the following example, trees[3] is removed from the array completely using splice:
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
trees.splice(3,1);

console.log(trees); // ["redwood", "bay", "cedar", "maple"]

---
const numbers=[1,2,3]
numbers[9]=11 // Indices 3–8 are empty slots, not undefined:
console.log(numbers)

---
const numbers=[1,2,3] 
numbers[9]=numbers // Indices 3–8 are empty slots, not undefined, but holes
console.log(numbers)

---
const arr=[..."anil"]
console.log(typeof arr)
console.log(Array.isArray(arr))

---
console.log(typeof 3+4+'5')

---
const arr=[1,2,3,4,5,6]
const marr=[...arr, 7]
console.log(marr)
marr.push(8)
console.log(marr)

const arr=[1,2,3,4,5,6]
const marr=[ 7, ...arr]
console.log(marr)
marr.push(8)
console.log(marr)