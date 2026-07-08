// selection sort: pick smallest among unsorted part of array and places it at the beginning
const arr=[29, 10, 14, 37, 9, 5] 
let arrLength=arr.length
let midIndex=0

for(let i=0;i<arrLength-1;i++){
    // Assume current index has the minimum value
    midIndex=i
    // Search the remaining array (i+1 to end) for the actual smallest element.
    for(let j=i+1; j<arrLength;j++){
        if(arr[j] < arr[midIndex]){
            midIndex=j
        }
        
    }

    if(midIndex!==i){
        [arr[midIndex], arr[i]] = [arr[i], arr[midIndex]]
    }
}


console.log(arr)
###
Time complexity:
| Case    | Complexity |
| ------- | ---------- |
| Best    | O(n²)      |
| Average | O(n²)      |
| Worst   | O(n²)      |
Selection sort always performs the same number of comparisons, regardless of the input order.

Space complexity:
    It sorts the array in place without using extra memory.

Number of Swaps

One advantage of Selection Sort is that it performs at most n - 1 swaps, because each pass places one element in its correct position.
For the example:
    Pass 1 → Swap
    Pass 2 → Swap
    Pass 3 → Swap
    Pass 4 → No Swap
Total swaps = 3
This is much fewer than algorithms like Bubble Sort, which may swap many times.

When to Use Selection Sort:
✅ Good for:
    Learning sorting algorithms.
    Small datasets.
    Situations where swapping is expensive (because it minimizes swaps).

❌ Not good for:
    Large datasets, due to its O(n²) time complexity.
    Performance-critical applications, where algorithms like Merge Sort or Quick Sort are much faster.