https://www.youtube.com/watch?v=XoGjPdPTAVA&list=PLQpVsaqBj4RIpDQIVowFni58LsK4cM9Qz&index=28

var ArrayWrapper=function(nums){
  this.nums=nums
}

// For objects, JavaScript coercion order is:
// valueOf()
// toString()
// error (if no primitive)
// Because you overrode valueOf(), JS knows exactly how to treat your object as a number.

// valueOf() tells JavaScript how to convert an object into a primitive value (number)
ArrayWrapper.prototype.valueOf=function(){
  return this.nums.reduce(
    (n,a)=>n+a,0  
  )
}

const obj1=new ArrayWrapper([1,2])
console.log(obj1)
const obj2=new ArrayWrapper([4,5])
console.log(obj2)

// What JavaScript does internally
// When JS sees + with objects:
// Try to convert objects to primitives
// Call valueOf() first
// If that returns a primitive → use it
// So this happens:
// obj1 + obj2
// ↓
// obj1.valueOf() + obj2.valueOf()
// ↓
// 3 + 9
// ↓
// 12
// console.log(obj1+obj2)

ArrayWrapper.prototype.toString=function(){
  return `[${String(this.nums)}]`
}

console.log(String(obj1))
console.log(String(obj2))