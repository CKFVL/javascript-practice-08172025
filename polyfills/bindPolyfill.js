const car1={
    name: 'Hyundai',
    model:'veloster'
}

const purchaseOrder={
    purchaseCar(color, price){
        console.log(`I purchased ${this.name}, ${this.model}, ${color}, ${price}`)
    }
}

Function.prototype.myBind=function(context ={}, ...args){
    if(typeof this !== 'function'){
        throw new Error('not a function')
    }

    //context.fn=this;
    // So the mental model is:
    /*
     bind(context, pre-filled arguments)
             ↓
       returns function
             ↓
     function(new arguments)
             ↓
       executes original
    */
    // return function(...newArgs){
    //    //return context.fn(...args, ...newArgs);
    // }

    // Although the above implementation works for learning, this:
    // context.fn = this;
    // modifies car1 by adding a fn property.
    // After binding:
    // console.log(car1)
    // you'll see something like:
    /*
        {
            name: 'Hyundai',
            model: 'veloster',
            fn: [Function: purchaseCar]
        }
    */

// One more important point: don't use context.fn = this for a bind polyfill. 
// That technique can be used as a simple approach for understanding call, 
// but bind specifically needs to return a new function and defer execution until that returned function is called.
    // A better polyfill uses apply and doesn't modify context:
    const originalFunction=this;
    /*
        myBind(car1, 'green')
            ↓
        remember:
            this  → car1
            args  → ['green']
            ↓
        return new function
            ↓
        pob2('$42000')
            ↓
        originalFunction.apply(
            car1,
            ['green', '$42000']
        )
    */
    return function(...newArgs){ // If you want to support arguments passed later which is one of the important features of bind
        return originalFunction.apply(context, [...args, ...newArgs])
    }
    
}

const pob=purchaseOrder.purchaseCar.myBind(car1)
pob('red', '$45000')
// OR
const pob2=purchaseOrder.purchaseCar.myBind(car1, 'green')
pob2('$42000')