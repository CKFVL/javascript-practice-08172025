Refer thisInDifferentEnvironment.js to understand the value of `this` in different environments
######################################

*** only functions create scope, not objects.
function () { } → creates new this
arrow function, () => { } → does NOT create new this
{ } object literal → does NOT create new this
example:
  let length = 10;
  const object = {
    length: 5,
    log: () => {
      console.log(this.length);
    },
  };

  object.log(); // undefined
###########################
// rule of thumb:
  // this : object that is executing the current function
  // if a function is a method in an Object ({}), this refers to object itself
  // if a function is regular function i.e., not inside an object, this refers to global object
      //refer: thisInDifferentEnvironment.js
  // if a function is constructor function and is created using new operator, then this refers to arguments to it in new {} object
###########################
Is the function an arrow function?
  │
  ├── YES → Inherit `this` from surrounding scope
  │             ▲
  │             │
  │    Closest enclosing scope:
  │      ├─ Regular function? → Use its `this`
  │      ├─ Another arrow? → Keep climbing outward
  │      └─ Global/module? → Use global/module `this`
  │
  └── NO (Regular function)
        │
        ├── Called with `new`? → `this` = New object
        │
        ├── Called with .call/.apply/.bind?
        │        → `this` = First argument passed
        │
        ├── Called as obj.method()? → `this` = Object left of dot
        │
        └── None of the above?
                 → `this` = Global object (non-strict) or undefined (strict)
Example:
------
  const obj={
  name:'pavan',
  log: ()=>{
    console.log(this.name)
  }
}

obj.log()

const obj2={
  name:'pavan',
  log: function(){
    console.log(this.name)
  }
}

obj2.log()

const obj3={
  name:'pavan',
  log: function(){
    console.log('function ',this.name)
    setTimeout(()=>{
      console.log('arrow timeout',this.name)
    }, 1000);
  }
}

obj3.log()
