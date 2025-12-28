const arr=[4,-5,22, 3, 0, 30, 1,2,3,4,5]

console.log(arr[2]) //22
console.log(arr[arr.length-2]) // 4
console.log(arr.at(2)) //22
console.log(arr.at(arr.length-2)) // 4
// but
console.log(arr.at(-0)) // 5