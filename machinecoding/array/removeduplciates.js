// remove duplicates
const arr=[1,2,2,3]
const set=new Set(arr)
console.log(set)

const uniqueArr=[...new Set(arr)]
console.log(uniqueArr)