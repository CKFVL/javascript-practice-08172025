// linear search- O(n)
// time complexity: O(log n)
const arr=[-1,0,3,8,10, 20]
const target=10;

// assumption: binary search works on sorted array only
let startIndex=0;
let endIndex=arr.length-1;


while(startIndex<=endIndex){
    let midIndex=Math.floor((startIndex+endIndex)/2)
    console.log(midIndex)
    if(target===arr[midIndex]){
        console.log(arr[midIndex])
        break
    }

    if(arr[midIndex]>=arr[startIndex]){
        startIndex=midIndex
    }else{
        endIndex=midIndex
    }

    console.log('startIndex', startIndex)
    console.log('endIndex', endIndex)
}
