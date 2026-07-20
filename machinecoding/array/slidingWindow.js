The sliding window algorithm is a technique used to solve problems involving *** contiguous subarrays or substrings efficiently ***. 
Instead of checking every possible subarray (which is often O(n2)), it "slides" a window over the array or string, 
making the solution O(n) in many cases.

The Basic Idea
Imagine an array:
    [2, 1, 5, 1, 3, 2]

Suppose you want to find the maximum sum of any subarray of size 3.
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

###########################################################################
Variable Sliding Window
Sometimes the window size is not fixed.
Example:
    Find the smallest subarray whose sum is at least 7.
    Array:
        [2,3,1,2,4,3]

    We use two pointers:
    left = 0
    right = 0

Expand the window by moving right.
    [2] sum=2
    Expand:
    [2,3] sum=5

    Expand:
    [2,3,1] sum=6

    Expand:
    [2,3,1,2] sum=8

Now the condition is satisfied (sum >= 7).
    Try shrinking from the left:
        Remove 2

    [3,1,2]
        sum=6

    Condition fails, so expand again.
    Continue until the end.