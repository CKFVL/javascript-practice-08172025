it works similarly how you sort playing cards in your hand

Real-world analogy
Imagine you have these cards:
7, 3, 5, 2

Pick the first card (7) → it is already sorted.
Take 3 → compare with 7, insert before it.
Take 5 → compare with 7, move 7 right, insert 5.
Take 2 → move all larger cards right, insert 2.

Final order:
2, 3, 5, 7

Algorithm:
    For every element starting from index 1:

    Store the current element (key).
    Compare it with elements to its left.
    Shift larger elements *one position* to the right.
                           ------------
    Insert the key into the correct position.

// how you sort playing cards in your hand
const arr=[7,3,5,2]

// shift larger elements to right
for(let i=0;i<arr.length;i++){
    let key=arr[i];
    let j=i-1;

    while(j>=0 && arr[j]>key){
        arr[j+1]=arr[j]
        j--;
    }

    arr[j+1]=key

}

console.log(arr)

leet code problem:
given the hesd of a singly linked FileList, sort the list using insertion sort and return the sorted list's head