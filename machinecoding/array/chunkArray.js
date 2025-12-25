// implement your chunk
// (arr: any[], size:number)
// chunk([1,2,3,4,5], 1) ==> [[1], [2], [3], [4], [5]]
// chunk([1,2,3,4,5], 2) ==> [[1, 2], [3, 4], [5]]
// chunk([1,2,3,4,5], 3) ==> [[1, 2, 3],  [4, 5]]
// chunk([1,2,3,4,5], 4) ==> [[1, 2, 3, 4], [5]]
// chunk([1,2,3,4,5], 5) ==> [1, 2, 3, 4, 5]

// function chunk(arr, size){
//   // num < arr.size, num+size, 
//   let num=0
//   let newArr=[]
//   while(num<arr.length){
//     console.log('num value', num)
//     let newNum=num+size;
//     newArr.push([...arr.slice(num, newNum)])
//     if(newNum>=arr.length){
//       num=newNum
//       break
//     }
//     num=num+size
//   }
  
//   if(num< arr.length){
//     console.log('merging left over array',num)
//   newArr.push([...arr.slice(num+1, arr.length)])
//   }
  
//   console.log(newArr)
// }

// chunk([1,2,3,4,5], 1)
// console.log('-------')
// chunk([1,2,3,4,5], 2)
// console.log('-------')
// chunk([1,2,3,4,5], 3)
// console.log('-------')
// chunk([1,2,3,4,5], 4)
// console.log('-------')
// chunk([1,2,3,4,5], 5)


function optimizedChunk(arr, size){
  if(!Array.isArray(arr) || arr.size==0) return
  
  let newArr=[]
  for(let i=0;i<arr.length;i+=size){
    newArr.push(arr.slice(i, i+size))
  }
  
  console.log(newArr)
}

optimizedChunk([1,2,3,4,5], 1)
console.log('-------')
optimizedChunk([1,2,3,4,5], 2)
console.log('-------')
optimizedChunk([1,2,3,4,5], 3)
console.log('-------')
optimizedChunk([1,2,3,4,5], 4)
console.log('-------')
optimizedChunk([1,2,3,4,5], 5)