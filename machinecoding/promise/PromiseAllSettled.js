
function fetchUser(userId){
  return new Promise((resolve, reject)=>{
    if(userId===21){
      setTimeout(()=>{
        console.log('user found')
        resolve(21)
      }, 100)
      
    }else{
      setTimeout(()=>{
        console.log('user not found')
        reject(21)
      }, 100)
    }
  })
}
function fetchPayment(payId){
  return new Promise((resolve, reject)=>{
    if(payId===211){
      setTimeout(()=>{
        console.log('payment found')
        resolve(211)
      }, 100)
    }else{
      setTimeout(()=>{
        console.log('payment not found')
        reject(211)
      }, 100)
    }
  })
}
function fetchAddress(addressId){
  return new Promise((resolve, reject)=>{
    if(addressId===99){
      setTimeout(()=>{
        console.log('address found')
        resolve(99)
      }, 100)
    }else{
      setTimeout(()=>{
        console.log('address not found')
        reject('address not found')
      }, 100)
    }
  })
}

class RunNTasks{
  
  constructor(ntasks){
    this.ntasks=ntasks
  }
  
  run(fnArray){
    Promise.allSettled(fnArray).then(([users, payments, addresses])=>{
        if(users.status === 'fulfilled'){
          console.log('users', users.value)
        }
        
        if(payments.status === 'fulfilled'){
          console.log('payments', payments.value)
        }
        
        if(addresses.status === 'fulfilled'){
          console.log('addresses', addresses.value)
        }
        
        if(addresses.status === 'rejected'){
          console.log(addresses.reason)
        }
        
    })
      
  }
  
  getTasks(){
    console.log(this.ntasks)
  }
}

let runtasks=new RunNTasks(2)
runtasks.getTasks()
runtasks.run([fetchUser(21), fetchPayment(211), fetchAddress(9099)])
