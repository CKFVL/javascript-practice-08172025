find the maximum sum of any subarray of size 3.
array: [2, 1, 5, 1, 3, 2]

Brute Force(O(n²))
Calculate:
2 + 1 + 5 = 8
1 + 5 + 1 = 7
5 + 1 + 3 = 9
1 + 3 + 2 = 6

Maximum = 9

Notice that when moving from one subarray to the next, most elements stay the same.
Instead of recalculating:
[2, 1, 5]
   ↓
[1, 5, 1]

We:
Remove 2
Add 1

This is the sliding window idea.

The sliding window algorithm is a technique used to solve problems involving contiguous subarrays or substrings efficiently. 
Instead of checking every possible subarray(which is often O(n2)), it "slides" a window over the array or string,
    making the solution O(n) in many cases.

        Step - by - Step Example
Array:
[2, 1, 5, 1, 3, 2]
Window size = 3
Step 1
Window = [2, 1, 5]
Sum = 8

Step 2
Slide right:
Old window: [2, 1, 5]
New window: [1, 5, 1]
New Sum = 8 - 2 + 1 = 7

Step 3
Slide again:
[5, 1, 3]
New Sum = 7 - 1 + 3 = 9

Step 4
[1, 3, 2]
New Sum = 9 - 5 + 2 = 6
Maximum = 9

// program:
-------------
    let arr = [2, 1, 5, 1, 3, 2]
function findMaximumSumOfSubstring(arr, size) {
    let maxSum = arr.slice(0, size).reduce((a, b) => a + b, 0)
    console.log(maxSum)
    for (let i = 1; i <= arr.length - size; i++) {
        let subarr = arr.slice(i, i + size); // for every window- O(k)
        console.log(subarr)
        let subMax = subarr.reduce((a, b) => a + b, 0) // for every window- O(k)

        maxSum = Math.max(subMax, maxSum)

    }
    return maxSum;
}
// where k = size.
// There are approximately (n-k+1) windows.
// So total complexity is:
// O((n-k+1) × k) ≈ O(nk)
let ms = findMaximumSumOfSubstring(arr, 3)
console.log(ms)
console.log('##################')
console.log('arr', arr)
function findMaxSumOfSubstring(arr, size) {
    if (size > arr.length) return null;
    let windowSum = 0;
    for (let i = 0; i < size; i++) {
        windowSum += arr[i]
    }
    console.log(windowSum)
    let maxSum = windowSum;
    for (let i = size; i < arr.length; i++) {
        windowSum = (windowSum - arr[i - size]) + arr[i];
        maxSum = Math.max(windowSum, maxSum);
        console.log(maxSum)
    }

    return maxSum;
}

// Sliding window: O(n) time and O(1) extra space, because it updates the sum incrementally instead of recomputing it for every window
let msx = findMaxSumOfSubstring(arr, 3)
console.log(msx)