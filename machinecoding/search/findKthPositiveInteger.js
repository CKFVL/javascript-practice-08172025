// given an array of positive integers sorted in a stictly increasing order, and an integer k.
// return the kth positive integer that is missing from this array
// example:
// Input: arr=[2,3,4,7,11], k=5
//output: 9
// explanation: the missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

// example 2:
// Input: arr=[1,2,3,4], k=2
// Output: 6
// explanation: the missing positive integers are [5,6,8,....]. the 2nd missing positive integer is 6.

let arr=[2,3,4,7,11] //[1,2,3,4]
let i=0;
let k=5 //2
let currentK=0
let j=1
let kthMissingElementArray=[]
while(currentK < k){ // 1
    if(arr[i]!==j){
        kthMissingElementArray.push(j); //1,5,6,8,9
        currentK++; // 5
        j++; //9
    }else{
        i++; //4
        j++; //8
    }

}
console.log(kthMissingElementArray.at(-0))


// array.at
const arr2=[4,-5,22, 3, 0, 30, 1,2,3,44,5]
console.log(arr2[2]) //22
console.log(arr2[arr.length-2]) // 4
// but
console.log(arr2.at(-0)) // 4
console.log(arr2.at(-1))

simpler intuition
Imagine you're looking for the 5th empty seat in a row of numbered seats.
You first guess it's seat 5.
Then you discover:

    Seat 2 is occupied → move your target to 6.
    Seat 3 is occupied → move it to 7.
    Seat 4 is occupied → move it to 8.
    Seat 7 is occupied → move it to 9.

You stop because seats beyond your current target (like seat 11) don't affect where the 5th empty seat is.
This is exactly what count is doing: every occupied position at or before your current target shifts the target one step to the right.

approach 2 using binary search:
----------

// given an array of positive integers sorted in a stictly increasing order, and an integer k.
// return the kth positive integer that is missing from this array
// example:
// Input: arr=[2,3,4,7,11], k=5
//output: 9
// explanation: the missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

// example 2:
// Input: arr=[1,2,3,4], k=2
// Output: 6
// explanation: the missing positive integers are [5,6,8,....]. the 2nd missing positive integer is 6.
// https://chatgpt.com/g/g-p-6a1ad6ea4ff88191a04d4bbeac5fef48-javascript-problems/c/6a3a0e2c-77a8-83e8-8b88-50dd99ce6200
function findKthPositiveInteger(arr, k){
    let left=0;
    let right=arr.length-1

    while(left <= right){
        let mid=Math.floor((left+right)/2)
        // How many positive numbers are missing before arr[mid]?
        // Think of this table as: suppose k=5
            // Before 2  → 1 missing number
            // There is only 1 missing number before 4.
            // Has the 5th missing number already occurred before this array element?
            // So it cannot be before or at 4.
            // It must be somewhere to the right., so left=mid+1
            //-----
            // Before 3  → 1 missing number
            // ---
            // Before 4  → 1 missing number
            // ---
            // Before 7  → 3 missing numbers
            // there are only 3 missing numbers before 4.
            // Has the 5th missing number already occurred before this array element?
            // So it cannot be before or at 7.
            // It must be somewhere to the right., so left=mid+1

            // ---
            // Before 11 → 6 missing numbers
            // Now there are already 6 missing numbers before 11.
            // We only wanted the 5th.
            // That means the answer must be before 11.
            // so search left, right=mid-1
        let missing=arr[mid]+(mid-1);

        // The mental model I recommend for interviews
        // Don't think:
        // "missing < k, so move left or right."
        // Instead think:
        // "At arr[mid], how many missing numbers have I already passed?"
        // Not enough (missing < k) → the kth missing number hasn't been reached → go right.
        // Enough or too many (missing >= k) → you've reached or passed the kth missing number → go left
        if(missing < k){
            left=mid+1
        }else{
            right=mid-1
        }
    }

// When the binary search ends:
// left is the count of array elements that are less than or equal to the answer.
// Those left existing numbers "push" the kth missing number to the right by left positions.
    return left+k;
}