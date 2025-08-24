to understand Javascript Eventloop, webapi, micro/macro task queues
https://www.youtube.com/watch?v=eiC58R16hb8

####################################################################
Available promise state and values
Pending -> undefined
Fulfilled -> resolved value
Rejected -> reason for rejection

####################################################################
Available promise methods:
-  all
-  allSettled
-  race
-  any

####################################################################
function step1(value, error){
  return new Promise( (resolve, reject) => {
    if(!error){
      resolve(value+10)
    }else{
      reject('something wrong')
    }
  })
}

async function result(){
  let res=await step1(10, false)
  console.log('result:'+res)
  return res;
}

console.log('final result'+ result().then(val=>console.log(val)).catch(err=> console.log(err)))

async function result2(){
  let res2=await Promise.resolve(200)
  return res2;
}

result2().then(val=>console.log(val))
