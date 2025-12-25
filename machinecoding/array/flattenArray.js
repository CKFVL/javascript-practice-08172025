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
