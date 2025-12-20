Spread: "Expands" an iterable (array, object, string) into individual elements
(Spread: "Take this box and dump out everything inside.")
Example 1: Array Expansion
let arr1=[1,2,3]
let arr2=[3,...arr1,5] // Spread creates a new array with extra elements
console.log(arr2)

Example 2: Object expansion
let obj1={a:1, b:2}
let obj2={...obj1, c:3}

let person = { name: 'Pavan', age: 40, country: 'India' };
// Spread adds properties
let newPerson = { ...person, job: 'Engineer' };
console.log(newPerson);
// { name: 'Pavan', age: 40, country: 'India', job: 'Engineer' }

3. clone object
const user = { name: "Pavan", age: 30 };
const clone = { ...user };

console.log(clone); // { name: "Pavan", age: 30 }

Example 4: function arguments
function sum(x, y, z){
  console.log(x+y+z)
}
sum(...[1,2,3])
#####################################
Rest: "Collects" all elements into single array or object
(Rest: "Take all these items and pack others/them into a box.")
// array destructuring
let[first, ...restArr]=[1,2,3,4]
console.log(first)
console.log(restArr)

// Rest pulls out first two, collects the rest
let [first, second, ...rest] = arr2;
console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50, 60, 70]

// object destructuring
let {a, ...restObj}={a:1, b:2, c:3}
console.log(a)
console.log(restObj)
// Rest extracts properties
let { name, ...others } = newPerson;
console.log(name);   // Pavan
console.log(others); // { age: 40, country: 'India', job: 'Engineer' }

function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
#####################################
Backup:
// Many JavaScript built-in functions support an arbitrary number of arguments.
// A function can be called with any number of arguments, no matter how it is defined.

// rest parameter: allows us to represent an indefinite number of arguments as an array (collects list of arguments to an array)

// spread operator: allows an iterable such as an array expression or string to be expanded in places where zero or more arguments
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// (for function calls) or elements (for array literals) are expected
// useful when 
// -    function call instead of 
//      Function.prototype.apply() in cases where you want to use the elements of an array as arguments to a function.

// spread operator can be used
	// create a new array using an existing array
	// copy array
	// concatenate 2 arrays (without spread, Array.prototype.unshift.apply(arr1, arr2) was being used)
		// Unlike unshift(), spread creates a new array, and does not modify the original array in-place.
// in js, immutability can be achieved using slice(array), spread operator
// spread does shallow copy, it means it copies one level of data and not nested structured data.
// #######################################################################
function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction.apply(null, args);

function myFunction(x, y, z) { }
var args = [0, 1, 2];
myFunction(...args); // spread

// array literals
// Without spread syntax, to create a new array using an existing array as one part of it, the array literal syntax is no longer sufficient and imperative code must be used instead using a combination of push(), splice(), concat(), etc. 
// With spread syntax this becomes much more succinct:
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];
// ["head", "shoulders", "knees", "and", "toes"]

// copy an array
var arr = [1, 2, 3];
var arr2 = [...arr]; // like arr.slice()
arr2.push(4);

//concatenate arrays
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// Append all items from arr2 onto arr1
arr1 = arr1.concat(arr2);

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2]; // arr1 is now [0, 1, 2, 3, 4, 5]

// Array.prototype.unshift() is often used to insert an array of values at the start of an existing array. Without spread syntax this is done as:
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
// Prepend all items from arr2 onto arr1
Array.prototype.unshift.apply(arr1, arr2) // arr1 is now [3, 4, 5, 0, 1, 2]
//With spread syntax, this becomes:
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr2, ...arr1]; // arr1 is now [3, 4, 5, 0, 1, 2]
//Note: Unlike unshift(), this creates a new arr1, and does not modify the original arr1 array in-place.

// shallow clone
//It copies own enumerable properties from a provided object onto a new object.
//Shallow - cloning(excluding prototype) or merging of objects is now possible using a shorter syntax than Object.assign().
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }

// Note that Object.assign() triggers setters whereas spread syntax doesn't.

//###################################################################################

'use strict'
var x = function () {
    // javascript has already arguments object to get function arguments, 
    // but it won;t be an array object and need to convert arguments object to array
    var args = Array.prototype.slice.call(arguments, 0);
    console.log(args)
    // also can use below instead
    var argsarray = [].slice.call(arguments, 0)
    console.log(argsarray[3])
}

x(1, 2, 3, 4)
// ############################################################
'use strict'
class Mammal {
    constructor(...args) {
        // adds args as array object to this
        Object.assign(this, { args });
        console.log(this.args)

        // adds array as object(with key as newargs) to this
        //this.newargs={...this,args}
        //console.log(this.newargs)

        // adds array as object(with key as newargs) to this
        //let newargs=Array.prototype.slice.call(arguments,0)        
        //this.newargs={...this,newargs}
        //console.log(this.newargs)
    }
}

class Bat extends Mammal {
    constructor(f, ...args) {
        super(...args)
        this.f = f;
    }
}

const newBat = new Bat('h', 'a', 'b', 'c', 'd', 'e')
console.log(newBat)
console.dir(Mammal)
// ############################################################
// Many JavaScript built-in functions support an arbitrary number of arguments.
// A function can be called with any number of arguments, no matter how it is defined.

function sum(a, b) {
    return a + b;
}

alert(sum(1, 2, 3, 4, 5)); // but only first 2 will be taken
// ############################################################
// There’s an easy way to distinguish between rest and spread operator:
// When ... is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
// When ... occurs in a function call or alike, it’s called a “spread operator” and expands an array into a list.

// Use patterns:
// Rest parameters are used to create functions that accept any number of arguments.
// rest parameters: to gather all arguments into array args
// The spread operator is used to pass an array to functions that normally require a list of many arguments.
function sumAll(...args) { // args is the name for the array
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
}
alert(sumAll(1)); // 1
alert(sumAll(1, 2)); // 3
alert(sumAll(1, 2, 3)); // 6
// ############################################################
//We can choose to get the first parameters as variables, and gather only the rest.
function showName(firstName, lastName, ...titles) {
    alert(firstName + ' ' + lastName); // Julius Caesar

    // the rest go into titles array
    // i.e. titles = ["Consul", "Imperator"]
    alert(titles[0]); // Consul
    alert(titles[1]); // Imperator
    alert(titles.length); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
// ############################################################
// push array to another
var dowhatever = ['have fun', 'have more fun', 'have even more fun']
var life = ['born', 'learn to walk', 'learn js', ...dowhatever, 'go to heaven']

console.log(life)

var a = [1, 2, 3]
var b = [4, 5, 6]
a.push(...b)
console.log(a)
// ##############################################################
// immutability: better control over data e.g., undo / redo, optimistic updates, tiem - travel debugging, etc.,
//     Also better performance can be achieved(in react) when comparing data with existing state and adding / updating properties in state.
//         e.g., pure component renders only when needed(i.e., state of enclosing component changes)
// another example is redux.

//     in js, immutability can be achieved using slice(array), spread operator
// e.g., 
const houses = ['Aryn', 'Frey', 'Greyjoy', 'Stark', 'Lannister', 'Tyrell']
const updatedHorses = [...houses, 'Targaryen'];//creates new array with copy of elements in houses and new element, Targaryen
const inDebt = [...houses.slice(0, 4), ...houses.slice(5)];
const updHouses = [...houses.slice(0, 1), 'Frey of crossing', ...houses.slice(2)];//adds element in updHouses at index 1

//spread does shallow copy, it means it copies one level of data and not nested structured data.
//e.g., 
const state = {
    name: 'pavan',
    occupation: 'develoepr',
    skills: []
}

//const newState={...state, occupation:'programmer'} 
//newState.skills.push('js') // occupation value in newState will be programmer, but skills will be updated both in state and newState objects
//so, to achieve immutability, do like below.
//newState.skills=[...newState.skills,'js'] // will add js to skills in newState only

// OR change occupation value and add skill to skills at sametime
const newState = { ...state, occupation: 'programmer', skills: [...state.skills, 'js'] }

console.log(state)
console.log(newState)
