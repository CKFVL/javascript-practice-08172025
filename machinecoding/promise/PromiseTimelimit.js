// Promise time limit: throw error when time limit exceeds to execute a function
// reject after delay

// throw error when time limit reaches for execution of a function
// slowFn: runs for certain time and succeeds
// rejectFn: runs for certain time and rejects
const rejectFn=(t)=>{
  return new Promise((_, reject)=>{
    setTimeout(()=>reject('request timedout'), t);
  })
}

const slowFn=(fn, execTime)=>{
  return function(...args){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(fn(...args))
      }, execTime)
    })  
  }
}
const promiseTimeLimit=(slowFn, t)=>{
  return function(...args){
    return Promise.race([slowFn(...args), rejectFn(t)])  
  }
}

let p=promiseTimeLimit(slowFn((a,b)=>a+b, 3000), 2000)(2,3)
p.then(res=>console.log(res)).catch(err=>console.log(err))