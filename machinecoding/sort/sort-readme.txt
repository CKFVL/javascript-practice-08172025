Stable sort means if 2 equal elements appear, the algorithm preserves the original order.

How do we determine if an algorithm is stable?
Look at what the algorithm does when two values are equal.
Rule:
    If equal elements are never swapped or reordered, the algorithm is stable.
    If they can change positions, it is unstable.

General method to check stability
Whenever you're learning a sorting algorithm:
Label duplicate values.
    4A, 2B, 4C, 1D
    Run the algorithm step by step.
    After sorting, check the order of duplicates.
    If 4A is still before 4C, it's stable.
    If 4C appears before 4A, it's unstable.

Key takeaway:
    A sorting algorithm is stable if, for any two elements with equal keys, 
    their relative order in the output is the same as in the input. 
    The easiest way to verify this is to label duplicate values (e.g., 5A, 5B) and 
    trace the algorithm to see whether their order is preserved.

Bubble Sort (Stable):
    Bubble sort swaps only when arr[j] > arr[j + 1]
Notice it does NOT swap when
    arr[j] === arr[j + 1]

Selection Sort (Unstable):
    Input: [(5,A), (3,B), (5,C), (2,D)]
    First pass:
        Minimum is (2,D).
        Selection sort swaps
        (5,A)
        with
        (2,D)

        Result:
        [(2,D), (3,B), (5,C), (5,A)]

        Originally:
        5A before 5C

        Now:
        5C before 5A

        Equal elements changed order.

Selection Sort is unstable.


Merge sort preserves their original order because the merge step uses:
    if(left[i] <= right[j]){
        results.push(left[i])
    }
Using <= ensures that equal elements from the left half are taken before those from the right, 
preserving their original relative order.
    merge uses
        if (left[i] <= right[j])
    then the left element is chosen first

    Original order is preserved.
    Merge Sort is stable.

If instead it used
    if (left[i] < right[j])
    then when values are equal, the right element would be chosen first

The order changes, making that implementation unstable.
So stability depends on the implementation, not just the high-level algorithm.


Quick Sort:
    During partitioning, elements may be swapped across the pivot.
Suppose the input is
    [(5,A), (4,B), (5,C), (3,D)]
During partitioning, elements may be swapped across the pivot.
One possible result after partitioning:
[(3,D), (4,B), (5,C), (5,A)]

Now:
5C before 5A

Originally it was
5A before 5C

Relative order changed.
Classic Quick Sort is not stable.