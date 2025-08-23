//https://www.youtube.com/watch?v=eY7u388cvM4
// Function:
function increment(i) {
    console.log("function")
}
// Function Expression
var fnexp = function incrementfnexp(i) {
    console.log("func exp")
}
fnexp(1)

###########################
fnexp = function incrementfnexp(i) {
    console.log("func exp")
}
fnexp(1)

Note: functions are values i.e. can be saved in a variable
fnexp is created as variable and not recommended but it has an advantage that it is hoisted (i.e. it can be called before the line it is defined)
var fnexp = function incrementfnexp(i) {
    console.log("func exp")
}

hoisting doesn't work when the function is created using const
const fnexp = function incrementfnexp(i) {
    console.log("func exp")
}
fnexp(1)


Anonymous function:
--------------------
const fnexp = incrementfnexp(i) {
    console.log("func exp")
}
###########################
Since function is a value, it can be stored in an object
const fun1={
    num: 1,
    // also called method
    func: function greeting(){ // function keyword is not required if called as fun1.func()
        console.log("hello")
    }
}

###########################
a function can be passed as a value to another function also called as callback function
###########################
Arrow function:
    const arrowFunction = (param1, param2) => {
        console.log(param1)
    }

    const arrowFunction = param => {
        console.log(param)
    }

    const arrowFunction = () => 2+3 // no need of {} if one line

###########################
It's recommended to use arrow function when passing to another function

Also, it's recommended to use short hand notation of function in an object
    const obj1 = {
        method: () => {

        }
    }

    const obj1 = {
        method(){
        }
    }

###########################
this.iifevar = 923432

//IIFE: execute the function right away and doesn't want to use it later
!(function iifefn() { // ! or ~ or - or + is mandatory, if not returning value
    console.log("iifefn")
})();
// closure preserves the state of variables inside of function and also arguments passed to it
// another advantage is it respects closure, i.e. global/outside variables passed as argument OR variables inside of it will be bound to iife scope 
~(function iifefn(i) { // ! is mandatory, if not returning value
    console.log("iifefn" + i)
})(this.iifevar);

var counter = (function () {
    var i = 0;
    return {
        get: function () {
            return i;
        },
        set: function (val) {
            i = val;
        },
        increment: function () {
            i++;
        }
    }
}
)();

console.log(counter.get())
counter.set(99)
console.log(counter.get())
counter.increment()
console.log(counter.get())

//##############################################################################################
