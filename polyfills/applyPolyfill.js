// polyfill of apply
const car1={
    name:'hyundai',
    model:'veloster'
}

function purchaseCar(price, color){
    console.log(`Purchased ${this.name} and ${this.model}, color: ${color} for ${price}`)
}
Function.prototype.myApply=function(context={}, args){
    if(typeof this !== 'function'){
        return new Error('not a function');
    }

    if(!Array.isArray(args)){
        return new Error('args not an array type')
    }
    // this inside myApply is purchaseCar, while this inside purchaseCar becomes car1.
    /*
    purchaseCar.myApply(car1, ['$30000', 'red'])
        │
        │
        ├── inside myApply:
        │
        │   this    → purchaseCar
        │   context → car1
        │
        │   context.fn = this
        │
        │   becomes:
        │
        │   car1.fn = purchaseCar
        │
        └── context.fn(...args)
                    │
                    ↓
              car1.fn('$30000', 'red')
                    │
                    │
                    └── inside purchaseCar:
                        
                        this → car1
    */
    context.fn=this;
    context.fn(...args)
    // improvement: your polyfill should ideally delete context.fn afterward, otherwise you're leaving an extra property on
    delete context.fn;
}
purchaseCar.myApply(car1, ['$30000', 'red'])

console.log('###############################') 

// polyfill of apply
const car1={
    name:'hyundai',
    model:'veloster'
}

const purchaseOrder={
    purchaseCar: function(price, color){
        console.log(`I purchase ${this.name}, ${this.model}, ${color} for ${price}`)
    }
}
Function.prototype.myApply=function(context={}, args){
    if(typeof this !== 'function'){
        return new Error('not a function');
    }

    if(!Array.isArray(args)){
        return new Error('args not an array type')
    }
    // this inside myApply is purchaseCar, while this inside purchaseCar becomes car1.
    /*
    purchaseCar.myApply(car1, ['$30000', 'red'])
        │
        │
        ├── inside myApply:
        │
        │   this    → purchaseCar
        │   context → car1
        │
        │   context.fn = this
        │
        │   becomes:
        │
        │   car1.fn = purchaseCar
        │
        └── context.fn(...args)
                    │
                    ↓
              car1.fn('$30000', 'red')
                    │
                    │
                    └── inside purchaseCar:
                        
                        this → car1
    */
    context.fn=this;
    context.fn(...args)
    // improvement: your polyfill should ideally delete context.fn afterward, otherwise you're leaving an extra property on
    delete context.fn;
}
purchaseOrder.purchaseCar.myApply(car1, ['$30000', 'red'])

console.log('###############################') 
