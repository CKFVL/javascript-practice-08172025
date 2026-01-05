Using reverse() (mutates the array)
const arr = [1, 2, 3, 4];
arr.reverse();
console.log(arr); // [4, 3, 2, 1]
⚠️ Important: reverse() changes the original array.
---
Reverse without mutating:
const arr = [1, 2, 3, 4];
const reversed = [...arr].reverse();
console.log(reversed); // [4, 3, 2, 1]
console.log(arr);      // [1, 2, 3, 4]
---
using a loop:
function reverseArray(arr) {
  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

console.log(reverseArray([1, 2, 3]));
---
// in place reverse
const arr=['W','e','l','c','o','m','e']
let left=0
let right=arr.length-1;

for(let i=0;i<arr.length/2;i++){
  // const temp= arr[right]
  // arr[right]=arr[i]
  // arr[i]=temp
  // This line swaps two elements using array destructuring.
  // This prevents:
  // swapping the same element twice: unnecessary work
  [arr[right], arr[left]]=[arr[left], arr[right]]
  left++
  right--
}

console.log(arr)