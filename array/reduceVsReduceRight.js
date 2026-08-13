// reduce: reads elements from left to right and produces a single value
// takes 4 arguments: total, value, index, array itself
// reduce() = take each element + update the accumulator + return the accumulator.
// The easiest way to understand reduce() is:
// *** reduce() takes many array elements and reduces them into one final result.

// The key thing to practice with reduce() is recognizing the shape of the accumulator:
      number        → sum / max
      string        → concatenation
      array         → flatten / collect
      object        → grouping / counting
      nested object → complex aggregation

Always ask these 3 questions
      Question 1: What am I processing ? (whether it is number, array, object, string, nested object)
      Question 2: What should my accumulator be ? (else.g. sum/max/flatten/collect/concatenation/grouping/counting/aggregation)
      Question 3: What should happen to the accumulator for every element ?

Understand the accumulator with different types:
  Number accumulator
    const nums = [10, 20, 30];
    const result = nums.reduce((acc, n) => {
        return acc + n;
    }, 0);

  Array accumulator
    const result = nums.reduce((acc, n) => {
        if (n % 2 === 0) {
            acc.push(n);
        }
        return acc;
    }, []);

  Object accumulator
    const result = fruits.reduce((acc, fruit) => {
        if (acc[fruit]) {
            acc[fruit]++;
        } else {
            acc[fruit] = 1;
        }
        return acc;
    }, {});

let numbers1 = [45, 4, 9, 16, 25];
let total = numbers1.reduce(
  function (
    total //accumulator.reducer
    , currentVal,
    currentIndex,
    numbers1 // array itself
  ) {
    return total + currentVal;
  },
  100 // initial value is optional
)

console.log(total)


#############################################################################
// sum of all numbers
const nums = [10, 20, 30, 40, 50];

let sum=nums.reduce((acc, current, index, arr)=>{
    return acc+current;
})
console.log(sum)

// find max.
const numsmax = [10, 45, 23, 89, 12, 67];
const maxnum=numsmax.reduce((acc, current, index, arr)=>{
    return Math.max(acc, current);
},0);
console.log(maxnum)

// count occurences
const fruits = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "apple"
];
// accumulator can be object
const fruitscount=fruits.reduce((acc, current, index, arr)=>{
    if(acc[current]){
        acc[current]++;
    }else{
        acc[current]=1;
    }

    return acc;
}, {});

console.log(fruitscount)

// Convert array to object
const users = [
  { id: 101, name: "Pavan" },
  { id: 102, name: "John" },
  { id: 103, name: "Mike" }
];
// {
//   101: { id: 101, name: "Pavan" },
//   102: { id: 102, name: "John" },
//   103: { id: 103, name: "Mike" }
// }
const obj=users.reduce((acc, current, index, arr)=>{
    if(acc[current]){
        return acc;
    }

    acc[current.id]=current;
    return acc;

},{});
console.log(obj)

// Calculate total price
const products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 1000 },
  { name: "Keyboard", price: 2000 }
];
const tprice=products.reduce((acc, current, index, arr)=>{
    return acc+=current.price
}, 0)
console.log(tprice)

// Group numbers into even and odd
// {
//   even: [2, 4, 6, 8],
//   odd: [1, 3, 5, 7]
// }
const numsgrouping = [1, 2, 3, 4, 5, 6, 7, 8];
const numsgrouped=numsgrouping.reduce((acc, current, index, arr)=>{
    if(current%2===0){
        acc['even'].push(current);
    }else{
        acc['odd'].push(current);
    }

    return acc;
}, {'even':[], 'odd':[]});
console.log(numsgrouped)

#############################################################################
// similarly reduceRight --> processes the array from right to left instead of left to right
const arr = [4, 3, 2, 1]

let revSum = arr.reduceRight((acc, currVal, index, arr) => {
  console.log(`acc:${acc}, value:${currVal}`)
  return acc + currVal
}, 0)  // initial value must be provided otherwise it'll prodcue inconsistent results

console.log(revSum)

---------
const arr = [[1, 2], [3, 4], [5]]
// instead of flattening and reversing array, use reduceRight (reverse order effect)
let rrarr = arr.reduceRight((acc, currVal, index, arr) => {
  acc.push(...currVal)
  return acc
}, [])

console.log(rrarr)
---------
  Function composition(common real use case)
const add = x => x + 2;
const multiply = x => x * 3;
const subtract = x => x - 3;

const funcs = [add, multiply, subtract]
let funcrev = funcs.reduceRight((acc, func, index, funcs) => {
  let accval = func(acc)
  return accval;
}, 0)

console.log(funcrev)
