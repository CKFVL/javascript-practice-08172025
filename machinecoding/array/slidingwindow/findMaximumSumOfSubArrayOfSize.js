find the maximum sum of any subarray of size 3.
array: [2, 1, 5, 1, 3, 2]

Brute Force (O(n²))
Calculate:
    2+1+5 = 8
    1+5+1 = 7
    5+1+3 = 9
    1+3+2 = 6

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
Instead of checking every possible subarray (which is often O(n2)), it "slides" a window over the array or string, 
making the solution O(n) in many cases.

Step-by-Step Example
Array:

[2, 1, 5, 1, 3, 2]
Window size = 3
Step 1
Window = [2,1,5]
Sum = 8

Step 2
Slide right:
Old window: [2,1,5]
New window: [1,5,1]
New Sum = 8 - 2 + 1 = 7

Step 3
Slide again:
[5,1,3]
New Sum = 7 - 1 + 3 = 9

Step 4
[1,3,2]
New Sum = 9 - 5 + 2 = 6
Maximum = 9