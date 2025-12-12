findIndex accepts a function:
hobbies.findIndex((item) => {
  return item === 'sports'
}
)
#####################
Array doesn't actually contain values, it refers to the values in memory and called as reference
e.g.
  const array1=[1,2,3] // array1 contains the reference of the values
  const array2=array1 // array2 contains the copy of reference which array1 references

  array2.push(5) // both references have 4 values now

to have a copy of the reference, use slice()
  const array1=[1,2,3]
  const array2=array1.slice()

  array2.push(5) // only pushes element to array2.
  
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
push - adds element at the end of array
splice(index, no. of values to remove) - remvoes an element from the array



###############
// ways to create arrays
var cars = ["Saab", "Volvo", "BMW"];
console.log(cars);
var newcars = new Array("Saab", "Volvo", "BMW"); //There might not be needed to use new Array().
console.log(newcars);

// add element to array
newcars.push("newcar1");

// Adding elements with high indexes can create undefined "holes" in an array:
newcars[10] = "7car";

console.log(newcars);

newcars.forEach(arrFunction);
function arrFunction(value) {
  console.log(value);
}

// Associative Arrays (with named indexes): js doesn't support; arrays always use numbered indexes.
// If you use named indexes, JavaScript will redefine the array to a standard object.
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
console.log(Array.isArray(points)); // true

var arrpoints = [40, 100];
console.log(typeof arrpoints); // object
console.log(arrpoints instanceof Array); // true
console.log(Array.isArray(arrpoints));// true
console.log(arrpoints.constructor === Array);// true
console.log(Array.isArray(arrpoints)); // true

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

########################
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
let fruitslc = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let slicedFruits=fruitslc.slice(2, 4)// startIndex, endIndex-1
slicedFruits.forEach(sf=> console.log(sf))

console.log('##########')
let splicedFruits=fruitslc.splice(2, 4)// startIndex, endIndex
splicedFruits.forEach(sf=> console.log(sf))

console.log('##########')
let fruitsnew = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruitsnew.length)
console.log('@@@@@@@@@@@@@')
let fruitslc2 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
let splicedFruitsww=fruitslc2.splice(1,0, "kiwi", "watermelon") // splice(startIndex, endIndex)
splicedFruitsww.forEach(f=>console.log(f))
console.log('@@@@@@@@@@@@@')
fruitslc2.forEach(f=>console.log(f))
console.log('@@@@@@@@@@@@@')
let splicedFruitsNew=fruitsnew.splice(1,3, "kiwi", "pomegranate", "jackfruit")
splicedFruitsNew.forEach(fr=> console.log(fr))
console.log('##########')
fruitsnew.forEach(fn=>console.log(fn))

########################
// slice: slices out a piece of an array to new array and doesn't remove any elements from source array
// a way of achieving immutability
var fruitslc = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruitslc.slice(1)); // slices out elements starting from 1
console.log(fruitslc.toString());
console.log(fruitslc.slice(1, 3)); // slices out elements starting from 1 to 3
console.log(fruitslc);

//concat
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
console.log(myArrayMax(pointsMathMax));

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

console.log(total);

// similarly reduceRight
########################
// every : checks every element and true if all pass a test
var numbers = [45, 4, 9, 16, 25];
var allOver18 = numbers.every(myFunction);

function myFunction(value) {
  return value > 18;
}

console.log(allOver18);
########################
// similary Array.some

//indexOf: searches for element and returns the element's index
// lastIndexOf: searches from end of array
//find(): returns the first element that passes a test
// findIndex: returns the index of first element that passes a test
var numbers = [4, 9, 16, 25, 29];
var first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 18;
}

console.log(first);
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
// When you delete an array element, the array length is not affected. This holds even if you delete the last element of the array. When the delete operator removes an array element, that element is no longer in the array. In the following example, trees[3] is removed with delete.
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




