const nums=[1,10,5]
nums.sort()
console.log(nums)

// because sort is built to work only on strings, so comparator function
nums.sort((x,y)=>(x-y)) // ascending
console.log(nums)

nums.sort((x,y)=>(y-x)) // ascending
console.log(nums)

example 2:
let str='abefcdghikopyxz'

function stringWithAlphabeticalOrder(aplphastr){
  let ascicodeArr=aplphastr.split("").map(c=>c.charCodeAt(0)).sort((x,y)=>(x-y))
  console.log(ascicodeArr)
  let charArray=ascicodeArr.map(n=>String.fromCharCode(n))
  return charArray
}

console.log(stringWithAlphabeticalOrder(str))

############
const input=[1,2,-2,11,7,1]
let sortedArray=input.sort((a,b)=>a-b)
console.log(sortedArray[1])
