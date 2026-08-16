// polyfill for promise: https://www.youtube.com/watch?v=Th3rZjfKKhI&t=1853s
*** Pending implementation:
// promise requires : resolve, reject, then, catch
// const regPromise=new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve('promise resolved')
// }, 2000);
// })

// When you do: new PromisePolyfill((resolve, reject) => { ... })
// the function receives the executor: (resolve, reject) => { ... }

// regPromise.then(data => console.log(data, 'so promise task completed'));

// PromisePolyfill
// then accepts callback which will be executed in resolve

// think of the code as this sequence
/*
    new PromisePolyfill(executor)
            │
            ▼
    executor(resolve, reject)
            │  wait 2 secs
            ▼
    setTimeout(..., 2000)
            │
            │  2 seconds
            ▼
    resolve("promise resolved")
            │
            ▼
    onResolve("promise resolved")
            │
            ▼
    callback("promise resolved")
            │
            ▼
    console.log(...)
*/
/*
    If you're learning Promise polyfills for interviews, remember this skeleton:
        let onResolve;
        // resolve calls the callback defined in then
        function resolve(value) {
            onResolve(value);
        }

        // .then() stores the callback; resolve() executes the stored callback.
        this.then = function(callback) {
            onResolve = callback;
            return this;
        };
*/
function PromisePolyfill(executor) {
    // These variables will eventually hold the callbacks passed to .then() and .catch().
    // initially undefined
    let onResolve, onReject;

    // In a real Promise, .then() does not return the same Promise.
    // It returns a new Promise
    // this implementation is just a simplified way to support basic chaining.
    this.then = function (callback) {
        onResolve = callback;
        // return the current PromisePolyfill object so another method can be called on it. (chaining)
        return this;
    }

    // When resolve('promise resolved') is called, it tries to execute whatever function is stored in onResolve.
    // resolve('promise resolved') conceptually means onResolve('promise resolved')
    // onResolve come from .then()
    // it's like When somebody calls me, I'll call onResolve()
    function resolve(value) {
        onResolve(value)
    }

    function reject(value) {
        onReject(value)
    }

    this.catch = function (callback) {
        return this;
    }

    executor(resolve, reject)
}

const regPromisePolyfill = new PromisePolyfill((resolve, reject) => {
    setTimeout(() => {
        // When resolve('promise resolved') is called, it tries to execute whatever function is stored in onResolve.
        resolve('promise resolved')
    }, 2000);
})

regPromisePolyfill.then(data => console.log(data, 'so promise task completed'));