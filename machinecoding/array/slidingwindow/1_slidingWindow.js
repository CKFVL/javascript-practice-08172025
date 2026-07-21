The sliding window algorithm is a technique used to solve problems involving *** contiguous subarrays 
or substrings efficiently ***. 
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

Visual representation for finding longest substring without repeating characters:
------------------------------------------------------------------------------
The sliding window is easiest to understand visually. 
Imagine a window moving across the string. The window always contains unique characters.
    Let's dry run "abcabcbb".
        String:  a  b  c  a  b  c  b  b
        Index :  0  1  2  3  4  5  6  7
    
    left = start of window
    right = end of window

Step 1:
    right = 0
     a  b  c  a  b  c  b  b
 [L,R]
    Window = "a"
    Length = 1
    Max = 1

Step 2:
    right = 1
     a  b  c  a  b  c  b  b
  [L    R]
    Window = "ab"
    Length = 2
    Max = 2

Step 3:
    right = 2
     a  b  c  a  b  c  b  b
    [L     R]

Window = "abc"
Length = 3
Max = 3

Step 4 (Duplicate 'a')
right = 3
 a  b  c  a  b  c  b  b
[L        R]

Window = "abca"
Duplicate found!
Instead of restarting, we shrink the window from the left.
Remove 'a'
 a  b  c  a  b  c  b  b
    L     R

Window = "bca"
Now all characters are unique again.
Length = 3
Max = 3

Step 5:
-------
right = 4
 a  b  c  a  b  c  b  b
    L        R

Window = "bcab"
Duplicate 'b'
Remove left characters until 'b' is gone.
Remove 'b'
 a  b  c  a  b  c  b  b
       L        R
Window = "cab"
Length = 3

Step 6:
right = 5

 a  b  c  a  b  c  b  b
       L           R

Window = "cabc"
Duplicate 'c'
Remove 'c'

 a  b  c  a  b  c  b  b
          L       R

Window = "abc"
Length = 3

Step 7

right = 6

 a  b  c  a  b  c  b  b
          L          R

Window = "abcb"

Duplicate 'b'

Remove until old 'b' disappears.

Remove 'a'

 b  c  b

Still duplicate.

Remove 'b'

 c  b

Now unique.

Window becomes

 a  b  c  a  b  c  b  b
             L       R

Window = "cb"
Length = 2

Step 8:

right = 7

 a  b  c  a  b  c  b  b
             L          R

Window = "cbb"

Duplicate 'b'

Remove 'c'

bb

Still duplicate.

Remove 'b'

b

Window becomes

 a  b  c  a  b  c  b  b
                L      R

Window = "b"

Length = 1

Final Answer
Maximum window ever seen:

abc

Length = 3

the window never moves backward:
    right only moves forward (0 → n-1).
    left only moves forward (never decreases).

Because each pointer visits each character at most once, the algorithm runs in O(n) time.

program:
-------------
(refer findLargestSubStringwithoutrepeatingCharacters.js file)


#################################################################
When Should You Use Sliding Window?
    Use it when the problem involves:
        ✅ Contiguous subarrays
        ✅ Contiguous substrings
        ✅ Finding maximum/minimum length
        ✅ Counting distinct characters
        ✅ Fixed-size windows
        ✅ Variable-size windows

    Examples:
        Maximum sum of size k
        Longest substring without repeating characters
        Minimum window substring
        Longest subarray with sum ≤ k
        Maximum average subarray