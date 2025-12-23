// sum of numbers
const nums=[1,2,3,4]

const sum=nums.reduce((acc, n, index, nums)=> acc+n, 0)
console.log(sum)