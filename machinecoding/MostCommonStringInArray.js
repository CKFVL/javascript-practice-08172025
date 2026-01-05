// define a function that takes an array of strings, and returns the most commonly occuring string in that array
const strarray=['abc', 'abc', 'bcd', 'cde', 'def', 'cde', 'cde']
function mostOccuringStringInArray(occuringStringArray){
  const omap=new Map([])
  occuringStringArray.forEach(w=>{
  if(omap.has(w)){
  omap.set(w, (omap.get(w) || 0) + 1)
  }else{
    omap.set(w, 1)  
  }
  }
  )
  
  let mostOccuringKey;
  let maxCount=0;
  for(const [key,val] of omap){
    if(val>maxCount){
      mostOccuringKey=key
      maxCount=val
    }
    
    
  }
  
  console.log(mostOccuringKey)
  
}

mostOccuringStringInArray(strarray)

#########
one pass solution:

// define a function that takes an array of strings, and returns the most commonly occuring string in that array
const strarray=['abc', 'abc', 'bcd', 'cde', 'def', 'cde', 'cde']
function mostOccuringStringInArray(occuringStringArray){
  const omap=new Map([])
  let maxCount=0
  let maxKey
  
  occuringStringArray.forEach(w=>{
  const count= (omap.get(w) || 0) + 1
  omap.set(w, count)
  if(count>maxCount){
    maxCount=count
    maxKey=w
  }
  }
  )
  
  console.log(maxKey)
  
}

mostOccuringStringInArray(strarray)