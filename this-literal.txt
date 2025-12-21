*** only functions create scope, not objects.
function () { } → creates new this
() => { } → does NOT create new this
{ } object literal → does NOT create new this
example:
let length = 10;
const object = {
  length: 5,
  log: () => {
    console.log(this.length);
  },
};

object.log(); // output: 10
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
