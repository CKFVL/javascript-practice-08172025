Stable sort means if 2 equal elements appear, the algorithm preserves the original order.
Merge sort preserves their original order because the merge step uses:
    if(left[i] <= right[j]){
        results.push(left[i])
    }
Using <= ensures that equal elements from the left half are taken before those from the right, 
preserving their original relative order.

