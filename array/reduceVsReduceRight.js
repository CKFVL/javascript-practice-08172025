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

// group employees by dept
const employees = [
  { name: "Pavan", dept: "IT" },
  { name: "John", dept: "HR" },
  { name: "Mike", dept: "IT" },
  { name: "Sara", dept: "Finance" },
  { name: "David", dept: "HR" }
];
/*
{
  IT: [
    { name: "Pavan", dept: "IT" },
    { name: "Mike", dept: "IT" }
  ],
  HR: [
    { name: "John", dept: "HR" },
    { name: "David", dept: "HR" }
  ],
  Finance: [
    { name: "Sara", dept: "Finance" }
  ]
}
*/
const empgroup=employees.reduce((acc, current, index, arr)=>{
    if(!acc[current.dept]){
        acc[current.dept]=[];
    }
    acc[current.dept].push(current);

    return acc;
}, {})

console.log(empgroup)

// Find the highest-paid employee in each department
const employees = [
  { name: "Pavan", dept: "IT", salary: 90000 },
  { name: "Mike", dept: "IT", salary: 120000 },
  { name: "John", dept: "HR", salary: 70000 },
  { name: "Sara", dept: "HR", salary: 95000 },
  { name: "David", dept: "Finance", salary: 110000 }
];
// expected
/*{
  IT: { name: "Mike", dept: "IT", salary: 120000 },
  HR: { name: "Sara", dept: "HR", salary: 95000 },
  Finance: { name: "David", dept: "Finance", salary: 110000 }
}*/
const maxsal=employees.reduce((acc, current, index, arr)=>{
    return Math.max(acc,current.salary);
}, 0);

console.log(maxsal);

// Flatten a nested array — one level
const arr = [
  [1, 2],
  [3, 4],
  [5, 6]
];

const nestedarr=arr.reduce((acc, current, index, arr)=>{
    acc.push(...current);
    return acc;
},[])
console.log(nestedarr)

// Build a frequency map of characters
const str = "javascript";
// {
//   j: 1,
//   a: 2,
//   v: 1,
//   s: 1,
//   c: 1,
//   r: 1,
//   i: 1,
//   p: 1,
//   t: 1
// }

const freqobj=str.split("").reduce((acc, current, index, arr)=>{
    const accurrent=acc[current]
    if(accurrent){
        acc[current]=accurrent+1;
    }else{
        acc[current]=1;
    }

    return acc;
},{})

console.log(freqobj)

// Calculate cart summary
const cart = [
  { product: "Laptop", price: 50000, quantity: 1 },
  { product: "Mouse", price: 1000, quantity: 2 },
  { product: "Keyboard", price: 2000, quantity: 1 }
];
// prodcue
// {
//   totalItems: 4,
//   totalPrice: 54000
// }
const cartobj=cart.reduce((acc, current, index, arr)=>{
    acc.totalItems+=current.quantity;
    acc.totalPrice+=current.price;
    return acc;
}, {'totalItems':0, 'totalPrice':0})
console.log(cartobj)

// Group transactions by user and calculate total
const transactions = [
  { user: "Pavan", amount: 1000 },
  { user: "John", amount: 500 },
  { user: "Pavan", amount: 2000 },
  { user: "John", amount: 1500 },
  { user: "Mike", amount: 3000 }
];
/*
    {
        Pavan: 3000,
        John: 2000,
        Mike: 3000
    }
*/
const grtx=transactions.reduce((acc, current, index, arr)=>{
    if(acc[current.user]===undefined){
        acc[current.user]=current.amount;
        console.log(acc)
    }else{
        const accuser=acc[current.user]+current.amount;
        acc[current.user]=accuser;
    }
    return acc;
}, {})

console.log(grtx)

// find duplicate numbers
const nums = [1, 2, 3, 2, 4, 5, 1, 6, 3, 3];
const noduparr=[]
const duparray=nums.reduce((acc, current, index, arr)=>{
    //if(noduparr.indexOf(current)!==-1){
    if(noduparr.includes(current) && !acc.includes(current)){
        acc.push(current)
    }else{
        noduparr.push(current)
    }

    return acc;
}, [])

console.log(duparray)

// using set
// find duplicate numbers
const nums = [1, 2, 3, 2, 4, 5, 1, 6, 3, 3];
const numset=new Set([])
const duparray=nums.reduce((acc, current, index, arr)=>{
    //if(noduparr.indexOf(current)!==-1){
    if(numset.has(current) && !acc.includes(current)){
        acc.push(current)
    }else{
        numset.add(current)
    }

    return acc;
}, [])

console.log(duparray)

// Nested categories → count products
const products = [
  { name: "Laptop", category: "Electronics", price: 50000 },
  { name: "Phone", category: "Electronics", price: 30000 },
  { name: "Shirt", category: "Clothing", price: 2000 },
  { name: "Jeans", category: "Clothing", price: 3000 },
  { name: "TV", category: "Electronics", price: 40000 }
];
// expected
/*
    {
  Electronics: {
    count: 3,
    totalPrice: 120000
  },
  Clothing: {
    count: 2,
    totalPrice: 5000
  }
}
*/

const nestedcat=products.reduce((acc, current, index, arr)=>{
    if(acc[current.category]===undefined){
        acc[current.category]={
            count: 1, totalPrice: current.price
        }
    }else{
        const catobj=acc[current.category];
        catobj.count+=1;
        catobj.totalPrice+=current.price;
        acc[current.category]=catobj;
    }

    return acc;
}, {});

console.log(nestedcat)

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
