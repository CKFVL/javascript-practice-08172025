function callApi(){
  const apiResponse={
    name:'pavan'
  }
  
  return new Promise((resolve, reject)=>{
    if(apiResponse.name==='pavdan'){
      resolve(apiResponse)
    }else{
      reject(new Error('data not found'))
    }
  })
}

async function retryApi(fn, retries=3, delay=500){
  try{
    const res=await fn()
    console.log(res)
    return res
  }catch(e){
    console.log(e)
    if(retries===0){
      console.log("api failed after retries")
      throw e
    }
    await new Promise(res=>setTimeout(res, delay))
    return retryApi(fn, retries-1, delay)
  }
}


retryApi(callApi, 4, 500).catch(err => {
  console.error('Final failure handled: ', err.message)
})

// (async () => {
//   try {
//     await retryApi(callApi, 4, 500)
//   } catch (e) {
//     console.error('Final failure handled:', e.message)
//   }
// })()
