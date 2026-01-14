let arr=[1,2,3,4,5,6,7,8,9,10]
let arrLen=arr.length

while(arrLen>0){
  arrLen--;
  let indexTochg=Math.floor(Math.random()*arrLen)
  let temp=arr[arrLen]
  arr[arrLen]=arr[indexTochg]
  arr[indexTochg]=temp
}

console.log(arr)