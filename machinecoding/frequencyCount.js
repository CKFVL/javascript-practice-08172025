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