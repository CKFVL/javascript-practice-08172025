to understand Javascript Eventloop, webapi, micro/macro task queues
https://www.youtube.com/watch?v=eiC58R16hb8

A promise in the javascript represents a single value that will be available now, in the future or never (in case of error)
It's used to handle asynchronous operations
States:
  pending
  fulfilled
  rejected

A promise emits only one value (or error)
eager -> starts executing immediately when created
cannot be cancelled once started
####################################################################
Imagine we want to fetch user details, then fetch their orders, then fetch shipping info.
Each step depends on the previous one. If any step fails, the chain should stop with an error.

Chaining promises:
------------------
function fetchUser(userId){
  
  return new Promise((resolve, reject)=>{
    setTimeout(function() {
      if(userId===1){
        resolve({'id':1, 'name': 'pavan', orderId: 21})
      }else{
        reject('user not found')
      }
    }, 1000);
  })
}

function fetchOrders(orderId){
  
  return new Promise((resolve, reject)=>{
    setTimeout(function(){
      if(orderId===21){
        resolve({'orderId': 21, 'details': 'iphone', 'paymentId': 11})
      }else{
        reject('order not found')
      }
    })
  })
}

function fetchPayment(paymentId){
  return new Promise(
    (resolve, reject)=>{
      if(paymentId===11){
        resolve({'paymentId': 11, 'type': 'visa', 'expires': '11/2030'})
      }else{
        reject('payment not found')
      }
    }
    )
}
fetchUser(1). // pass another value to fail
then(val=>{
  console.log(val)
  return fetchOrders(21); // pass another value to fail
}).
then(orderval=>{
  console.log(orderval)
  return fetchPayment(11); // pass another value to fail
}).
then(paymentVal=>{
  console.log(paymentVal)
}).
catch(error=> console.log(error)).finally('task completed')

#############################################################
Run Tasks in Parallel with Promise.all
