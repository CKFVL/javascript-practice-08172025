Memoization in JavaScript
Memoization is an optimization technique where you cache the results of expensive function calls and return the cached result when the same inputs occur again.

It’s commonly used for:
    Recursive algorithms (Fibonacci, factorial)
    Heavy computation functions
    Avoiding repeated API or database calls

function memoize(fn){
    let cache={}

    return function(...args){
        const key=JSON.stringify(args);
        if(cache[key]){
            console.log('returning the results from cache')
            return cache[key];
        }

        let result=fn.apply(this,args);
        cache[key]=result;
        return result;
    }
}


function add(a, b){
    return a+b;
}
let mf=memoize(add)
let a1=mf(2,3)
console.log(a1)
let a2=mf(8,9)
console.log(a2)
let a3=mf(2,3)
console.log(a3)

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/69339974-8898-8320-881a-d623276cf2b3

In a typical memoize implementation, you should not stringify the function. You only need to stringify (or otherwise uniquely identify) the arguments.
Why?
When you write:
    const memoizedAdd = memoize(add);

a new closure is created:
    function memoize(fn) {
        const cache = {};   // cache is Private to this function
        // ...
    }
That closure permanently captures one specific function (fn).

So inside that closure:
    fn never changes.
    The only thing that changes between calls is args.

Therefore, the cache key only needs to distinguish different argument lists.
Think of it like this
    Suppose you have:
        const memoizedAdd = memoize(add);
        const memoizedMultiply = memoize(multiply);

        Internally, you have two separate caches:
        memoizedAdd
        ------------
        fn = add
        cache = {
        "[2,3]": 5
        }

        memoizedMultiply
        ----------------
        fn = multiply
        cache = {
        "[2,3]": 6
        }
    
    Since each memoized function has its own cache, including the function in the key would be redundant.