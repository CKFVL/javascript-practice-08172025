const sleep=new Promise((resolve)=>setTimeout(resolve, 2000))
console.log(new Date())
console.log('sleeping')
await sleep
console.log(new Date())
console.log('sleep')