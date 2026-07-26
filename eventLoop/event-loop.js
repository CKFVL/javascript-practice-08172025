https://www.youtube.com/watch?v=eiC58R16hb8
https://www.jsv9000.app/ - for analyzing the interactive visualization
########################
browser APIs:
Macro task:
    setTimeout
    setInterval;
    fetch

Micro task (runs high priority tasks)
    Promise
########################
call stack -> Microtask queue -> Macrotask queue
########################
function a(){
    console.log("A")
}
setTimeout(() => console.log("B"), 0)
a()
console.log("C")
Promise.resolve().then(() => console.log("D"))

Step-by-step execution
1️⃣ Synchronous code (Call Stack)

JS runs all synchronous code top to bottom first.

setTimeout(...)   // schedules a macrotask → B
a()               // logs "A"
console.log("C")  // logs "C"
Promise.resolve() // schedules a microtask → D

Output so far:
A
C

2️⃣ Microtask Queue (highest priority)
After the call stack becomes empty, JS runs ALL microtasks before touching macrotasks.

Promise.then → console.log("D")

Output:
D

3️⃣ Macrotask Queue (Task Queue)
Now JS takes the next macrotask.

setTimeout → console.log("B")
Output:
B

✅ Final Output Order
A
C
D
B

Why setTimeout(..., 0) is NOT immediate ❗
0 means minimum delay, not instant

It still goes to the macrotask queue
Microtasks always run before macrotasks

Execution model summary 🧠
Call Stack (sync)
   ↓
Microtask Queue (Promises, queueMicrotask)
   ↓
Macrotask Queue (setTimeout, setInterval, I/O)

One-liner rule to remember
Promises beat timeouts. Always.

########################
console.log(1)
setTimeout(() => {
    console.log(2)
}, 0)
Promise.resolve(console.log(3))
console.log(4)

Output: 1, 3, 4, 2

⚠️ Important gotcha
console.log(3) is executed immediately
Its return value is undefined
So this becomes:
Promise.resolve(undefined) // This does NOT create a microtask

➡️ prints 3 right now, synchronously
➡️ No .then() → no microtask is scheduled

✅ This DOES
Promise.resolve().then(() => console.log(3))
or
Promise.resolve(3).then(console.log)

*** Rule to remember:
Arguments to functions are evaluated immediately
Only .then(), await, or queueMicrotask() schedule microtasks.

Macrotask Queue (setTimeout):
setTimeout(() => {
    console.log(2)
}, 0)
➡️ Runs after call stack + microtasks
➡️ prints 2


#####################################
Another example:
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

