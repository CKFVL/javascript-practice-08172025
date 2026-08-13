https://www.youtube.com/watch?v=Th3rZjfKKhI

// map polyfill
Array.prototype.myMap=function(callback){
    this.temp=[];
    for(let i=0;i<this.length;i++){
        this.temp.push(callback(this[i], i, this))
    }

    return this.temp;
}


const arr=[1,2,3,4,5];
const mularr=arr.myMap((num, i, arr)=>{
    return num *3;
})

console.log(mularr)

// reduce polyfill
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a7e0947-da34-83e8-bd17-8eb4ba3b6435
// reduce polyfill

// accumulator type would be string, array, object and integer value (sum,max)
// typeof
// .constructor
// instanceof
// Array.isArray
Array.prototype.myReduce=function(cb, initialValue){
    let accumulator=initialValue;
    console.log(accumulator);
    for(let i=0;i<this.length;i++){
        // if accumulator, callback otherwise assign first element.
        accumulator=accumulator ? cb(accumulator, this[i], i, this):this[i];
    }
    return accumulator;
}

const arr=[10, 45, 23, 9, 12, 67];
const cb=function(acc, currentValue, index, arr){
    return Math.min(acc, currentValue);
}
console.log(arr.myReduce(cb, 0))

//---
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
const cbfnobj=(acc, currVal, index, arr)=>{
    if(acc[currVal.id]===undefined){
        acc[currVal.id]=currVal;
    }

    return acc;
}
console.log(users.myReduce(cbfnobj, {}))