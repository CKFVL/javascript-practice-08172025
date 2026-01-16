let execTimes=1
let once=(a,b,c)=>{
  
  if(execTimes>1){
    return undefined
  }
  execTimes++
  return (a+b+c)
}

let onceFn=once(1,2,3)
console.log(onceFn)

let twofn=once(4,8,9)
console.log(twofn)

//#########
const callonce=(fn)=>{
  let called=false
  return function(...args){
    if(!called){
      return fn(...args)
      called=true  
    }
    
    return undefined
    
  }
}

const add=(a,b,c)=>a+b+c
console.log(callonce(add)(1,22,3))