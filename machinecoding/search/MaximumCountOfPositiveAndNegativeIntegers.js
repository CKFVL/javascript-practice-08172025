// given an array nums sorted in non-decreasing order, return the max. between the number of positive integers and the number of negative integers
// in other words, if the number of positive integers in nums is pos and the number of negative integers is neg, 
// then return the max. of pos and neg.
// note that 0 is neither positive nor negative

// input: nums = [-2,-1,-1,1,2,3]
// output: 3
// 3 positive integres and 3 negative integers, so max. count among them is 3.

// How to remember the binary search solution
// Think of the sorted array as three sections:
// [ negatives ][ zeros ][ positives ]

// You only need to find the two boundaries:
// Boundary 1: Where negatives end (first >= 0) First index where value >= 0 i.e., Everything before it is negative.
// Boundary 2: Where positives begin (first > 0) First index where value > 0 i.e., Everything after it is positive.

// Then calculate:
// negativeCount = first index of >=0
// positiveCount = n - first index of >0
// answer = max(negativeCount, positiveCount)

// This "find the boundary" pattern is one of the most common binary search techniques and appears in many interview problems.


// find position where arr[index]>=0 (negative numbers end)
// find position where arr[index]>0 (positive numbers start)
// if there are no zeros, the first element >= 0 is also the first element > 0
// ref: https://chatgpt.com/g/g-p-6a1ad6ea4ff88191a04d4bbeac5fef48-javascript-problems/c/6a41f3e2-d4f0-83e8-9894-6ce536d3f2a7
function findGreaterThanEqualZero(arr, target){
    let left=0;
    let right=arr.length-1;
    let ans=arr[arr.length-1];

    while(left<=right){
        let mid=Math.floor((left+right)/2)

        if(arr[mid]>=target){
            ans=mid;
            right=mid-1
        }else{
            left=mid+1
        }
    }

    return ans;
}

function findGreaterThanZero(arr, target){
    let left=0;
    let right=arr.length-1;
    let ans=arr[arr.length-1];

    while(left<=right){
        let mid=Math.floor((left+right)/2)

        if(arr[mid]>target){
            ans=mid;
            right=mid-1
        }else{
            left=mid+1
        }
    }

    return ans;
}
const arr=[-3,-2,-1,0,0,1,2]//[-2,-1,-1,1,2,3]
let negativeEnds=findGreaterThanEqualZero(arr, 0)
let positiveStarts=findGreaterThanZero(arr,0)

console.log(negativeEnds)
console.log(arr.length-positiveStarts) // where positive numbers start
// maximum count
console.log(Math.max(negativeEnds, arr.length-positiveStarts))

