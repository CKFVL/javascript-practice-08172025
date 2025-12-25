// create a fetch with auto retry when error happens until the maximum count is set
function fetchWithAutoRetry(fetcher, maximumRetryCount){
  
  if(maximumRetryCount>0){
    console.log('retries', maximumRetryCount)
    fetcher.then(e=>console.log(e)).catch(e=>{
      console.log(e) 
      fetchWithAutoRetry(fetcher, maximumRetryCount-1)
    })
  }
}

const p=new Promise((resolve, reject)=>{
 const apiResponse={
   name:'padvan', age: 30
 }
 if(apiResponse.name==='pavan'){
   resolve(apiResponse)
 }else{
   reject(new Error('bad request'))
 }
})

fetchWithAutoRetry(p,3)

