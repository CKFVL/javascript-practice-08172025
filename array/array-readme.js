ways to create array:
const array=[1,2,3]
---
const array1=[1,2,3] // array1 contains the reference of the values
const array2=array1 // array2 contains the copy of reference which array1 references

  array2.push(5) // both references have 4 values now

/ Adding elements with high indexes can create undefined "holes" in an array:
newcars[10] = "7car";

If you use named indexes, JavaScript will redefine the array to a standard object.
----
slice: copy or extract
splice(index, deleteCount, item1, item2,....) - ad/remove/replace

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
how to recognize an array
---
Array methods: pop, push, shift, unshift, delete
---
sort function sorts array values as strings
can produce wrong sorting for numbers, so use comapre function instead