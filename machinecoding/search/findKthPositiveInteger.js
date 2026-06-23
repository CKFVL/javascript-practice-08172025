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

const arr2=[4,-5,22, 3, 0, 30, 1,2,3,44,5]
console.log(arr2[2]) //22
console.log(arr2[arr.length-2]) // 4
// but
console.log(arr2.at(-0)) // 4
console.log(arr2.at(-1))