const arr=[29,10,14,37,9]

let arrLength=arr.length;

for(let i=0;i<arrLength;i++){
    for(let j=0;j<arrLength-i-1;j++){ // highest element will be moved to the end in each iteration
        if(arr[j]>arr[j+1]){
            [arr[j], arr[j+1]]=[arr[j+1], arr[j]]
        }
    }
}

console.log(arr)