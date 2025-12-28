const nums=[1,10,5]
nums.sort()
console.log(nums)

// because sort is built to work only on strings, so comparator function
nums.sort((x,y)=>(x-y)) // ascending
console.log(nums)

nums.sort((x,y)=>(y-x)) // ascending
console.log(nums)