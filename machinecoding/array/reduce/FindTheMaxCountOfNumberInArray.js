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
let arrk=[1,2,3,12,2,3,12, 1,2,3,2121,2]

function freqCount(arr){
  let freqObj={}
  arr.forEach(elem=>{
    if(freqObj.hasOwnProperty(elem)){
      freqObj[elem]++
    }else{
      freqObj[elem]=1
    }
  })
  return freqObj
}

function findMax(fObj){
  return Object.keys(fObj).reduce((maxKey, currentKey) => {
    return fObj[currentKey] > fObj[maxKey] ? currentKey : maxKey
  })
}

function findIndexOfMax(fObj){
  let fkeys= Object.keys(fObj)
  return fkeys.reduce((maxKey, currentKey, idx, fkeys) => {
    return fObj[currentKey] > fObj[maxKey] ? currentKey : maxKey
  })
}

let frearr=freqCount(arrk)
console.log(frearr)
console.log(findMax(frearr))