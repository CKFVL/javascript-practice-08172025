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
      called=true 
      return fn(...args)
    }
    
    return undefined
    
  }
}

const add=(a,b,c)=>a+b+c
let twicecalledsum=callonce(add);

console.log(twicecalledsum(1,22,3))
console.log(twicecalledsum(1,22,3))

const sub=(a,b)=>a-b;
let twicecalledsub=callonce(sub)
console.log(twicecalledsub(4,3))
console.log(twicecalledsub(9,7))

Or drive it with number
function callFnOnlyKTimes(k, fn){
  let n=0;
  return function(...args){
    if(n>k){
      console.log('function calls reached limit')
      return
    }
    n++
    return fn(...args)
  }
}

let cfok=callFnOnlyKTimes(2, (name)=>console.log(`my name is ${name}`))
cfok('pavan')
cfok('pavan')
cfok('pavan')

cfok('pavan')