// polyfill of call for function
// https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a7ec26e-e4a8-83ee-b6bb-7ec2bc4576f1
const person1={name:'pavan'}

function sayName(){
    console.log(`Hello ${this.name} !`)
}

Function.prototype.myCall=function(context={}, ...args){
    if(typeof this !== 'function'){
        throw new Error('not a function')
    }

    context.fn=this;
    /*
        context.fn=this is effectively: person1.fn = sayName;
        Now person1 temporarily looks like:
        const person1 = {
            name: 'pavan',
            fn: sayName
        };
    */
    context.fn(...args)
}

sayName.myCall(person1)
// ################################
// polyfill of call for object
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a7ec26e-e4a8-83ee-b6bb-7ec2bc4576f1
const person1={
    name:'pavan',
    sayName: function(){
        console.log(`Hello ${this.name} !`)
    }
}
const person2={
    name: 'guru',
    ssid: 1233333,
    sayName: function(){
        console.log(`Hello ${this.name} !, your ssid : ${this.ssid}`)
    }
}

Function.prototype.myCall=function(context={}, ...args){
    if(typeof this !== 'function'){
        throw new Error('not a function');
    }
    console.log(context)
    context.fn=this; // this === person1.sayName becomes person2.fn = person1.sayName;
    /*
        context.fn=this is effectively: person2.fn = person1.sayName;
        Now person2 temporarily looks like:
        const person2 = {
            name: 'guru',
            ssid: 1233333,
            sayName: function() {
                console.log(`Hello ${this.name} !, your ssid : ${this.ssid}`);
            },

            fn: person1.sayName
        };

            myCall
               |
               v
    person1.sayName -----> this inside myCall
                                |
                                | context = person2
                                v
                            person2.fn = person1.sayName
                                |
                                v
                            person2.fn()
                                |
                                v
                            this = person2
    */
    context.fn(...args)
    // One improvement: your polyfill should ideally delete context.fn afterward, otherwise you're leaving an extra property on person2:
    delete context.fn;
}
//person1.sayName()
//person2.sayName()
person1.sayName.myCall(person2)
