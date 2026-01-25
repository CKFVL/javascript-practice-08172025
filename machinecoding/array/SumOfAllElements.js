const arr=[2,7,11,4,-2]
//output: [20, 15, 11, 18, 24]
// forwardSum
// function forwardSum(total, idx, arrLen){
//   if(idx>=arrLen){
//     return total
//   }
//   total+=arr[idx]
//   return forwardSum(total, idx+1, arrLen)
// }

function forwardSum(idx){
  let total=0
  arr.slice(idx).forEach(num=>{
   return total+=num 
  }
)
return total
}

// backward sum
function backwardSum(idx){
  let btotal=0
  arr.slice(0,idx+1).forEach(num =>{
    return btotal+=num
  })
  console.log(btotal)
  return btotal
}

let newarr=[]
for(let i=0; i<arr.length; i++){
  let fs=forwardSum(i+1)
  let bs=0?0:backwardSum(i-1)
  
  console.log('#######')
  console.log(fs)
  console.log(bs)
  newarr.push(fs+bs)
}
console.log(newarr)

//##########x
const total=arr.reduce((sum,n)=>sum+n,0)
console.log(total)

const result=arr.map(n=>total-n)
console.log(result)

