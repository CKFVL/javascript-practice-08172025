// Promise time limit: throw error when time limit exceeds
// reject after delay

function rejectedFn(delay){
  return new Promise((_, reject)=>{
          setTimeout(()=>reject('Time limit exceeded'), delay);
  })
}

function promiseTimeLimit(fn, t){
  return function(...args){
    return Promise.race([
      fn(...args),
      rejectedFn(t)
     ]
    )
  }
}

const sum=(a,b)=>a+b
promiseTimeLimit(sum, 2000)(2,99)
.then(data=>console.log(data))
.catch(err=>console.log(err))
//.finally(console.log('completed'))

// Promise(res => setTimeout(res, 3000));
// slow function

function slowFn(fn, execTime){
  return function(...args){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve(fn(...args))
    }, execTime)
    })
}
}
//slowFn(sum)(4,54).then(data=>console.log(data)).catch(err=>console.log(err))

promiseTimeLimit(slowFn(sum, 3000), 2000)(56,23)
.then(data=>console.log(data))
.catch(err=>console.log(err))
//.finally(console.log('completed'))