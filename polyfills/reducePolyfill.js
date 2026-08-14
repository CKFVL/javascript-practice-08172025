const arr=[4,6,1,3,9,43,56,0,51];
Array.prototype.myReduce=function(cb, initialValue){
    let accumulator=initialValue;
    let startIndex=0;

    if(arguments.length<2){
        accumulator=this[0];
        startIndex=1;
    }

    for(let i=startIndex;i<this.length;i++){
        accumulator=cb(accumulator, this[i], i, this);
    }

    return accumulator;
}

const reducecb=(acc, currVal, index, arr)=>{
    return Math.min(currVal, acc);
}
console.log(arr.myReduce(reducecb, 0))
console.log("###################")
const users = [
  { id: 101, name: "Pavan" },
  { id: 102, name: "John" },
  { id: 103, name: "Mike" }
];
// output
// {
//   101: { id: 101, name: "Pavan" },
//   102: { id: 102, name: "John" },
//   103: { id: 103, name: "Mike" }
// }
const reduceobj=(acc, currVal, index, arr)=>{
    console.log(acc[currVal.id])
    if(acc[currVal.id]===undefined){
        acc[currVal.id]=currVal;
    }

    return acc;
}

console.log(users.myReduce(reduceobj, {}))

console.log("###################")
const fruits = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "apple"
];
const fruitedcount=(acc, currVal, index, arr)=>{
    if(acc[currVal]===undefined){
        acc[currVal]=1;
        return acc;
    }

    acc[currVal]=acc[currVal]+1;
    return acc;
}
console.log(fruits.myReduce(fruitedcount, {}))
