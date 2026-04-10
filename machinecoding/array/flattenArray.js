const a= [1,2,3,{test: 'key'}, [4,[5,6]],7,8]


function flattenArray(a){
  let result=[]
  for(num of a){
    if(Array.isArray(num)){
      result.push(...num)
      result=flattenArray(result)
    }else{
      result.push(num)
    }
  }
  
  return result
  
}

const res=flattenArray(a)
console.log(res)
#################################
// let arr=[1,[2,3],[[4,5],6], 7, 8, [9,10]]

// console.log(arr.flat()) // [ 1, 2, 3, [ 4, 5 ], 6, 7, 8, 9, 10 ] - 1 level only
// console.log(arr.flatMap(x=>x)) // [ 1, 2, 3, [ 4, 5 ], 6, 7, 8, 9, 10 ] - 1 level only

Approach: 1
console.log(arr.flat(Infinity)) // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]

Approach: 2
let arr=[1,[2,3],[[4,5],6], 7, 8, [9,10, [3,4, [9,10]]]]
//console.log(arr.flat())
//console.log(arr.flat(Infinity))

function iterativeFlattening(arr){
  let flatArr=[]
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      //console.log(arr[i])
      flatArr.push(...iterativeFlattening(arr[i]))
    }
    else{
      flatArr.push(arr[i])
      console.log(flatArr)
    }
  }
  
  return flatArr
}

flatArr=iterativeFlattening(arr)
console.log(flatArr)

###### OR ############
Approach: 3
let arr=[1,[2,3],[[4,5],6], 7, 8, [9,10]]
// iterative - large/deep arrays
function iterativeFlattening(narr){
  let stack=[...narr]
  let result=[]
  
  while(stack.length){
    const next=stack.pop()
    if(Array.isArray(next)){
      stack.push(...next)
    }else{
      result.push(next)
    }
  }
  console.log(result)
  return result.reverse()
}

console.log(iterativeFlattening(arr))

Approach: 4
// recursive - works for any
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val)
      ? acc.concat(flatten(val)) // concat() does NOT modify acc, It creates a NEW array every time : many temporary arrays
      : acc.concat(val),
    [] // The first element of the array is automatically used as the initial accumulator (acc)
  );
}

flatten([1, [2, [3, 4]], 5]);
// [1, 2, 3, 4, 5]

OR
// run the previous logic in reduce
function redFlattenArray(arr){
  return arr.reduce((acc, currVal)=>{
    if(Array.isArray(currVal)){
      acc.push(...redFlattenArray(currVal)) //push() modifies the same array, No new array is created
    }else{acc.push(currVal)}
    return acc
  }
  ,[])
}

Use push (recommended)
  Large arrays
  Performance-critical code