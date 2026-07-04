merge sort works in 3 steps:
    1.  divide the array into 2 halves
    2.  recursively sort each half
    3.  merge the 2 sorted halves

Instead of repeatedly swapping elements like bubble or selection sort, 
merge sort keeps dividing until every subarray contains only 1 element.

At each level, merging all subarrays processes n elements equal.
    Time complexity: O(n log n)
    Space Complexity: O(n)
        An extra array is used during merging.

Recursion tree: [8,4,6,2]
                       [8,4,6,2]
                 /           \
            [8,4]          [6,2]
           /    \         /     \
        [8]    [4]     [6]     [2]
           \    /         \     /
          [4,8]          [2,6]
               \          /
             [2,4,6,8]

code:
// merge sort: divide the array to 2 halves recursively and merge 2 sorted halves
function mergeSort(arr){
    if(arr.length<=1){
        return arr;
    }

    const mid=Math.floor(arr.length/2)
    let leftArr=arr.slice(0, mid);
    let rightArr=arr.slice(mid);

    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge(leftArr, rightArr){
    let results=[];
    let i=0,j=0;

    while(i< leftArr.length && j<rightArr.length){
        if(leftArr[i]<=rightArr[j]){
            results.push(leftArr[i]);
            i++;
        }else{
            results.push(rightArr[j]);
            j++;
        }
    }

    while(i<leftArr.length){
        results.push(leftArr[i]);
        i++;
    }

    while(j<rightArr.length){
        results.push(rightArr[j]);
        j++;
    }

    return results;
}

const arr=[38, 27, 43, 3, 9, 82, 10]//[8,4,2,6]
const sortedArr=mergeSort(arr)
console.log(sortedArr)

When should you use Merge Sort?
    Sorting large datasets efficiently.
    When you need a stable sort.
    When worst-case performance matters.
    Commonly used for sorting linked lists and in external sorting (sorting data too large to fit in memory).