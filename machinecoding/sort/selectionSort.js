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

When to Use Selection Sort

✅ Good for:
    Learning sorting algorithms.
    Small datasets.
    Situations where swapping is expensive (because it minimizes swaps).

❌ Not good for:
    Large datasets, due to its O(n²) time complexity.
    Performance-critical applications, where algorithms like Merge Sort or Quick Sort are much faster.