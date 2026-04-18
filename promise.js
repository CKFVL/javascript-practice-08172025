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
  if(users.status === 'fulfilled'){
          console.log('users', users.value)
        }
        
        if(payments.status === 'fulfilled'){
          console.log('payments', payments.value)
        }
        
        if(orders.status === 'fulfilled'){
          console.log('orders', addresses.value)
        }
        
        if(orders.status === 'rejected'){
          console.log(orders.reason)
        }
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

###############
// convert non-promised to promised based feature
return new Promise((resolve, reject)=>{
	resolve(dummydata)
})
export async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 2000))
}
################################
Valid ways to return a Promise:
returning a promise directly:
  function fetchData() {
    return new Promise(resolve => {
      setTimeout(() => resolve("data"), 1000)
    })
  }

2. Using async (syntactic sugar)
    async function fetchData() {
      return "data"
    }
  This automatically returns a Promise:
  fetchData().then(console.log) // "data"

Equivalent to:
function fetchData() {
  return Promise.resolve("data")
}

When async is NOT required
If you already return a Promise, adding async is optional:
function getData() {
  return fetch(url) // already a Promise
}

Same as:
async function getData() {
  return fetch(url)
}

✅ When async IS useful
Use async when you want to use await:
async function getUser() {
  const res = await fetch(url)
  return res.json()
}
Without async, await is illegal ❌
⚠️ Common misconception
async function test() {
  return Promise.resolve(5)
}
This returns Promise<Promise<number>>? 👉 No.
JavaScript automatically unwraps it → Promise<number>
🧠 Summary
| Case                                | Needs `async`? |
| ----------------------------------- | -------------- |
| Returns Promise manually            | ❌ No           |
| Uses `await`                        | ✅ Yes          |
| Returns value but should be Promise | ✅ Yes          |
| Wraps existing Promise              | ❌ Optional     |

######################################
Simple intuition
  Promise → “I’ll give you result later”
  await → “Wait here until result comes”

1️⃣ Without await
  console.log('start...')
  let ac = apiCall() // returns promise
  console.log('continuing...')
What happens:
  apiCall() is invoked
  It returns a Promise immediately
  JavaScript does NOT wait
  Execution continues right away
Order of execution:
  start...
  continuing...
Later (when promise resolves), nothing happens unless you handle it:
ac.then(res => console.log(res))
👉 Key idea:
Promise is just a placeholder, execution doesn't pause

2️⃣ With await
  console.log('start...')
  let ac = await apiCall()
  console.log('continuing...')

What happens:
  apiCall() is invoked
  await pauses execution of this function
  JS waits until the Promise resolves
  Then resumes execution
  Order:
  start...
  (wait happens here)
  continuing...

👉 Key idea:
    await unwraps the Promise and pauses execution (only inside async functions)

  ⚠️ Important nuance

await does NOT block the whole thread, only the current async function.
  Under the hood:

  JS registers a callback (microtask)
  Frees the call stack
  Resumes when Promise resolves

Timeline comparison:
    Without await
      Call stack:
      start → apiCall() → continuing → (later promise resolves)
    With await
      Call stack:
      start → apiCall() → pause function
                      ↓
              promise resolves
                      ↓
              resume → continuing
    💡 Equivalent form
      This:
      let ac = await apiCall()
      Is roughly same as:
      apiCall().then(ac => {
        console.log('continuing...')
      })
######################################
Examples:
function returnPromise(){
  return new Promise((resolve)=> console.log('hi')) // immediate execution
}
// Execution:
    // Promise executor runs immediately → console.log('hi')
    // resolve never called → Promise stays pending
    // Output:
    // hi
    // Promise { <pending> }

let rp=returnPromise()
console.log(rp)

async function returnPromiseAsync(){
  return new Promise((resolve)=> console.log('hi')) // immediate execution
}
// Execution:
// Same as above:
// logs hi
// inner promise is pending
// async wraps it → returns a Promise that adopts inner state
// Output:
// hi
// Promise { <pending> }
let rpasync=returnPromiseAsync()
console.log(rpasync)

// Execution:
// Promise resolved immediately
// .then() → goes to microtask queue
// .then() always async
// Even if resolved immediately:
function returnPromiseValue(){
  return new Promise((resolve)=> resolve('hello handled by client')) // client will handle the result
}
let rpv=returnPromiseValue()
rpv.then(l=>console.log(l))

// Same behavior → another microtask queued
function returnPromiseValueAsync(){
  return new Promise((resolve)=> resolve('hello handled by client')) // client will handle the result
}
let rpvasync=returnPromiseValueAsync()
rpvasync.then(l=>console.log(l))

// ❗ What happens?
// You never call resolve
// So the Promise stays:
// pobj // → pending forever
// After 2 seconds:
// setTimeout callback runs → logs message
// But Promise is still pending

// ✅ Timeline
// t=0   → Promise created (pending)
// t=2s  → console.log runs
//       → Promise still pending ❌

// Execution:
// setTimeout scheduled → macrotask
// Promise never resolved → stays pending
// Output:
// waiting...
// done...
// is promise pending Promise { <pending> }
const pobj=new Promise((resolve)=>setTimeout(function() {console.log('helloattimeout', new Date())}, 2000))
console.log('waiting...', new Date())
console.log('done...', new Date())
console.log('is promise pending', pobj)

// ❗ What happens?
// setTimeout(...) returns a timer ID (number in browsers, object in Node)
// That value is immediately passed to resolve(...)
// So:
// pobjresolve // → fulfilled immediately
// The timeout still runs later, but independent of the Promise
// ✅ Timeline
// t=0   → setTimeout scheduled
//       → resolve(timerId) called immediately ✅
//       → Promise fulfilled
// t=2s  → console.log runs

// Execution:
// setTimeout scheduled (macrotask)
// resolve(...) immediately → Promise fulfilled
// .then() → microtask
const pobjresolve=new Promise((resolve)=>resolve(setTimeout(function() {console.log('helloattimeout with resolve', new Date())}, 2000)))
pobjresolve.then(l=>console.log('resolved'))

// ✅ Correct Way
// // behavior
// t=0   → Promise pending
// t=2s  → log + resolve()
//       → Promise fulfilled

// Execution:
// Only schedules macrotask
// No .then() → no microtask yet
const pobjCorrect = new Promise((resolve) =>
  setTimeout(() => {
    console.log('hello after 2 sec', new Date())
    resolve('done')
  }, 2000)
)

Execution Order:
🧠 Key Rules First (so the timeline makes sense)
    Synchronous code runs first
    Promise executor runs immediately
    .then() callbacks → Microtasks queue
    setTimeout → Macrotask queue

Event loop priority:
      Call Stack → Microtasks → Macrotasks

