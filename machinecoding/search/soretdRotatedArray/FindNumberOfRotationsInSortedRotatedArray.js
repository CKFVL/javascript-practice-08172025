/*
https://chatgpt.com/g/g-p-6a143c894aa08191925350b54a830e7e/c/6a6ffdf2-6064-83ee-beba-7e524e139ac8
* A sorted and rotated array is an array that was originally sorted (ascending or descending) and then rotated (elements shifted circularly).
*
* Right Rotation: A right rotation moves the last element to the front.
*   [1, 2, 3, 4, 5, 6, 7]
*   1st right rotation:
*       [7, 1, 2, 3, 4, 5, 6]
*
* Left Rotation: If you rotate the original array to the left, you get:
*   [1, 2, 3, 4, 5, 6, 7]
*   1st left rotation:
*       [2, 3, 4, 5, 6, 7, 1]

  Efficient Solution (Binary Search) - O(log n)
    The minimum element is the pivot where the rotation happened.

  how do I know that [5, 6, 7, 1, 2, 3, 4] is rotated 3 times?
  [1, 2, 3, 4, 5, 6, 7]
  *
  * A sorted, rotated array always has exactly one point where the order breaks.
  * The smallest element is always immediately after that break. Its index equals the number of right rotations.

  Right Rotation:
    A right rotation moves the last element to the front.
  1st right rotation
    [7, 1, 2, 3, 4, 5, 6]
  2nd right rotation
    [6, 7, 1, 2, 3, 4, 5]
  3rd right rotation
    [5, 6, 7, 1, 2, 3, 4]

  So the array
    [5, 6, 7, 1, 2, 3, 4]
  is 3 right rotations.

  Left Rotation
    If you rotate the original array to the left, you get:

  1st left rotation
    [2, 3, 4, 5, 6, 7, 1]
  2nd left rotation
    [3, 4, 5, 6, 7, 1, 2]
  3rd left rotation
    [4, 5, 6, 7, 1, 2, 3]
  4th left rotation
    [5, 6, 7, 1, 2, 3, 4]

  So the same array is also:
    3 right rotations
    4 left rotations

  because the array length is 7, and:
  right rotations + left rotations = array length
    3 + 4 = 7

  Why does the algorithm return 3?
    The standard interview problem assumes right rotations.
    Notice where the smallest element (1) is:
    Index:   0 1 2 3 4 5 6
    Array:  [5 6 7 1 2 3 4]
                   ↑
                minimum

    The minimum element is at index 3, so the array has been right rotated 3 times.

    Easy way to remember:
      For an array of length n:
      Right rotations = index of the minimum element
      Left rotations = n − index of the minimum element

      Example:
      [5,6,7,1,2,3,4]

      Minimum element = 1
      Index = 3
      Length = 7

      Right rotations = 3
      Left rotations = 7 - 3 = 4

* Note: The values can be any distinct, sortable numbers. They do not have to start with 1 or be consecutive.
        Original:
        [10, 20, 30, 40, 50]
        After 2 right rotations:
        [40, 50, 10, 20, 30] // Index of minimum = 2, Rotation count = 2

        Original:
        [-15, -8, 0, 9, 25, 40]
        After 4 right rotations:
        [0, 9, 25, 40, -15, -8] // Index of minimum = 4, Rotation count = 4

Linear search: O(n)
Efficient Solution (Binary Search) - O(log n)
    The minimum element is the pivot where the rotation happened.
    By identifying the sorted half, we can determine whether the minimum (or target element) must lie in the other half and safely discard half of the search space in each iteration.
Algorithm
    If arr[low] <= arr[high], the array is already sorted.
        Rotations = 0
Find mid.
    Check whether mid is the minimum.
    Decide which half to search.
 */
/*
  A common follow-up is: "Find the minimum element in a sorted rotated array."
  The solution is identical—the only difference is what you return:
    Minimum element: arr[minIndex]
    Rotation count: minIndex
*/