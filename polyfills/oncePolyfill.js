// polyfill for once
function myOnce(fn, context){
    let ran; // contains the return value of fn
    if(typeof fn !== 'function'){

    }

    //console.log(context)
        
    return function(...args){
        if(fn){
            ran=fn.apply(context || this, args);
            fn=null; // disables the original function
        }

         return ran;
    }
}

let fnc=myOnce(()=>{
    console.log('executed only once')
    return 99;
});
console.log(fnc())
console.log(fnc())