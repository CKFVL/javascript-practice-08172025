// It's the easiest to visualize because larger elements "bubble up" to the end after each pass.
Bubble Sort Idea

Compare adjacent elements.

If the left element is greater than the right element, swap them. (repeatedly compare adjacent elements)
Continue until the largest element reaches the end. (after each pass the largest unsorted elemnt moves to the end)
Repeat for the remaining unsorted part.

Example:
[5, 3, 8, 4, 2]

Compare 5 and 3 → swap
[3, 5, 8, 4, 2]

Compare 5 and 8 → no swap
[3, 5, 8, 4, 2]

Compare 8 and 4 → swap
[3, 5, 4, 8, 2]

Compare 8 and 2 → swap
[3, 5, 4, 2, 8]

Notice that 8 reached its correct position.
---
const arr=[29,10,14,37,9]

let arrLength=arr.length;

for(let i=0;i<arrLength;i++){
    for(let j=0;j<arrLength-i-1;j++){ // highest element will be moved to the end in each iteration
        if(arr[j]>arr[j+1]){
            [arr[j], arr[j+1]]=[arr[j+1], arr[j]]
        }
    }
}

console.log(arr)

// leet code problem:
given an array nums with n objects colored red, white, or blue, sort them in-place
so that objects of the same color are adjacent with the colors in the order red, white, and blue.
