Given a multi-dimensional array of integers, return a generator object which yields integers in the same order as inorder traversal.
A multi-dimensional array is a recursive data structure that contains both integers and other multi-dimensional arrays.
inorder traversal iterates over each array from left to right, yielding any integers it encounters or applying inorder traversal to any arrays it encounters.

Example 1:

Input: arr = [[[6]],[1,3],[]]
Output: [6,1,3]
Explanation:
const generator = inorderTraversal(arr);
generator.next().value; // 6
generator.next().value; // 1
generator.next().value; // 3
generator.next().done; // true
Example 2:

Input: arr = []
Output: []
Explanation: There are no integers so the generator doesn't yield anything.

############
function spreadArray(arr){
  const newArr=[]
  for(let i=0;i<arr.length;i++){
    console.log(i)
     if(Array.isArray(arr[i])){
       console.log('isArray')
      newArr.push(...arr[i])
     }else{
       console.log('isNotArray')
       newArr.push(arr[i])
     }
  
  }
  return newArr
}

function inorderTraversal(arr){
    return spreadArray(arr)
    
}

function* arrayGenerator(nArr){
  
    for(let i=0;i<nArr.length;i++){
      yield nArr[i]
    }
    
}
const flattenArr=inorderTraversal([1, [2,3], 4, 5, [6,7,8,9]])
console.log('flat arr',flattenArr)

const arrgen=arrayGenerator(flattenArr)
console.log(arrgen.next())
console.log(arrgen.next())
console.log(arrgen.next())

