What is Quick Sort?

Quick Sort follows the Divide and Conquer approach.
Instead of dividing the array into equal halves (like Merge Sort), it:
    Picks one element called the Pivot.
    Places the pivot in its correct sorted position.
    All smaller elements go to the left.
    All larger elements go to the right.
    Repeat the same process on both sides

Example:
    [8,4,7,2,9,1,5]
    Pivot = 5

    After partition
    [4,2,1 | 5 | 8,7,9]

    Now sort
    [4,2,1]      [8,7,9]

Real World Example
    Imagine arranging books by thickness.

    Choose one book.
    Everything thinner → left
    Everything thicker → right

    Now repeat for both sides.
    Eventually every book reaches its correct place.

----
Partition:
    There are multiple partition techniques.
    The easiest one to understand is Lomuto Partition.
        we choose last element as the pivot

Time Complexity:
    | Case    | Complexity |
    | ------- | ---------- |
    | Best    | O(n log n) |
    | Average | O(n log n) |
    | Worst   | O(n²)      |
Worst case occurs when the pivot is always the smallest or largest element, such as an already sorted array when always choosing the first or last element as the pivot.

Space Complexity:
    Because Quick Sort sorts in place (no extra array like Merge Sort):

    Auxiliary space: O(log n) on average (recursive call stack)
    Worst case: O(n) due to recursion depth