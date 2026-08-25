let arr=[11, 4, 5, 8, 11, 14, 16, 2]
// find max
let mm=arr.reduce(function(num1, num2){
  return num1 > num2 ? num2: num1
})
console.log(mm)

// find index of max value
let maxIndex=arr.reduce((minIdx, currentValue, currentIndex, arr)=>{
  return currentValue > arr[minIdx] ? currentIndex: minIdx
},0)
console.log(maxIndex)

//######
// max. value
let fobj={'one':1, "two":9, "three": 3, "four": 4, "five": 5}
const arrredobj=Object.keys(fobj).reduce((maxValue, currval, index, arr)=>{
   return fobj[currval] > maxValue ? fobj[currval]: maxValue;
}, 0)

console.log(arrredobj)

function findIndexOfMax(fObj){
  let fkeys= Object.keys(fObj)
  return fkeys.reduce((maxKey, currentKey, idx, fkeys) => {
    return fObj[currentKey] > fObj[maxKey] ? currentKey : maxKey
  })
}

let frearr=freqCount(arrk)
console.log(frearr)
console.log(findMax(frearr))