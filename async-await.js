function fetchUser(userId){
    return new Promise((resolve, reject)=>{
        if(userId==1){
            resolve({'name':'pavan'})
        }else{
            reject('user not found')
        }
    })
}

console.log(fetchUser(1))
fetchUser(1).then(val => {
    console.log(val)
}).catch(err=>{
    console.log(err)
})

fetchUser(2).then(val =>{
    console.log(val)
}).catch(err=>{
    console.log(err)
})

Promise.all([fetchUser(12)]).then(([userDetails])=>{
    console.log(userDetails)
}).catch(error=>{
    console.log(error)
})

async function getData(){
    const userData=await fetchUser(1) // either usew try,catch or return the promise and then handle it in while the function is called.
    console.log('userData',userData)
    return userData;
}
getData().then(data=>console.log(data)).catch(err=>console.log(err))

OR
---
async function getDataTryCatch(userId){
    try{
    const userData=await fetchUser(userId)
    console.log('userData',userData)
    }catch(error){
        console.log('err with try catch', error)
    }
}
getDataTryCatch(22)
getDataTryCatch(1)

#######################
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
