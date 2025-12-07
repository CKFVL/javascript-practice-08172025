to understand Javascript Eventloop, webapi, micro/macro task queues
https://www.youtube.com/watch?v=eiC58R16hb8

A Promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation.
It acts like a placeholder for a value that will be available now, later, or never.
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
/*Example: Run Tasks in Parallel with Promise.all
fails fast → if any promise rejects, everything is considered failed.
*/
Promise.all([fetchUser(1), fetchPayment(11), fetchOrders(21)])
.then(([users, payments, orders])=> {
  console.log('##########Promise.all#####################')
  console.log(users);
  console.log(payments);
  console.log(orders)
})
.catch(error => {
    console.error("Error occurred:", error);
  });
  
/*Example: Tolerant Parallel Execution with Promise.allSettled
If you don’t want failures to stop the whole thing, use Promise.allSettled.*/
Promise.allSettled([fetchUser(1), fetchPayment(11), fetchOrders(212)])
.then(([users, payments, orders])=> {
  console.log('##########Promise.all#####################')
  console.log(users);
  console.log(payments);
  console.log(orders)
})
.catch(error => {
    console.error("Error occurred:", error);
  });
  
/*Returns the result of the first promise to settle (fulfilled OR rejected).
It’s like a race — whichever finishes first wins.*/
Promise.race([fetchUser(1), fetchPayment(11), fetchOrders(212)])
.then(result => {
  console.log('##########Promise.race#####################')
  console.log(result);
})
.catch(error => {
    console.error("Error occurred:", error);
  });

/*
Returns the result of the first fulfilled (successful) promise.
It ignores rejections unless all promises fail.
*/
Promise.any([fetchUser(1), fetchPayment(11), fetchOrders(212)])
.then(result => {
  console.log('##########Promise.any#####################')
  console.log(result);
})
.catch(error => {
    console.error("Error occurred:", error);
  });

