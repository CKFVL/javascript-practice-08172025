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

// console.log(arr.flat(Infinity)) // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]

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

// recursive - works for any
//
function flatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val)
      ? acc.concat(flatten(val))
      : acc.concat(val),
    []
  );
}

flatten([1, [2, [3, 4]], 5]);
// [1, 2, 3, 4, 5]
