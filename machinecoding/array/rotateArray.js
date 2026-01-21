//rotate array: to the right 
const input=[2,7,11,4,-2]
// output: [4,-2,2,7,11]

function rotateRight(arr, k){
  const n=arr.length
  k=k%n
  return arr.slice(-k).concat(arr.slice(0,n-k))
}

let rotated=rotateRight(input, 2)
console.log(rotated)

// rotate array: to the left
function rotateLeft(arr, k){
  const n=arr.length
  k=k%n
  return arr.slice(k).concat(arr.slice(0,k))
}
const linput=[2,7,11,4,-2] // output: [11,4,-2,2,7]
let rotatedleft=rotateLeft(linput, 2)
console.log(rotatedleft)