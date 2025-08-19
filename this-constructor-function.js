// constructor function
in both strict and non-strict mode, constructor function has access to `this` but the variables or objects mist be prefixed with this
function BankAccount(newname, newage){
  this.name=newname; // if not bound to this, then it is not accessible for the object
  let age=newage;
  let amount=100;
  let count=0;
  
  // the methods would just be local variables inside the function 
  // if not bound to this, then it is not accessible for the object
  this.deposit= (depositAmount) => {
    console.log(`amount to be deposited, ${depositAmount}`)
    if(depositAmount>0){
    amount+=depositAmount;
    }
    console.log(`total balance= ${amount}`)
  }
  
  this.withdraw=(withdrawAmount) => {
    console.log(`amount to withdraw, ${withdrawAmount}`)
    if(amount >0 && amount-withdrawAmount > 0){
      amount-=withdrawAmount;  
    }
    console.log(`total balance= ${amount}`)
  }
  
  this.updateName=function(updatedName){
    this.name=updatedName
  }
  
  this.updateAge=function(updatedAge){
    age=updatedAge
    console.log(`age updated to ${age}`)
  }

  setTimeout(function(){
    count+=100
    console.log(`count= ${count}`)
  },1000
  )
  
  // callback function
  // When you use a regular function callback (like the one you passed into setTimeout) inside a constructor, 
  // the value of this inside that callback does not automatically refer to the object created by the constructor.
  // what happens here??
  // inside the constructor, this refers to newly created object, c
  // However, inside the regular function passed to setTimeout, the value of this depends on how the function is called, not where it was defined.
  /*
  setTimeout() calls the callback as a normal function, not as a method of your object — so this inside the callback becomes:
  window (in browsers, non-strict mode)
  undefined (in strict mode)
  So when you try this.count += 100, you are either:
  modifying window.count, or
  throwing an error (if this is undefined).
  That’s why c.count remains unchanged!*/
  setTimeout(function(){
    this.count+=100
    console.log(`this.count in regular function in setTimeout= ${this.count}`)
  },1000
  )

  setTimeout(()=>{
    // this.count won’t work the way you might expect — because count is a local variable inside BankAccount(), not a property of this.
    this.count+=300
    console.log(`this.count from arrow function= ${this.count}`)
    
    count+=500
    console.log(`count from arrow function= ${count}`)
  },1000
  )
  
  setTimeout(()=>{
    this.name='pbkg'
    console.log(`this.name from arrow function= ${this.name}`)
    
    name='ewrrree'
    console.log(`name from arrow function= ${name}`)
  },1000
  )
}

const account=new BankAccount('pavan', 40);
account.deposit(1000)
account.withdraw(500)

const passDeposit=account.deposit;
passDeposit(400)


console.log(account.name)
account.name='bhogala'
console.log(account.name)

account.updateName('bgpkr')
console.log(account.name)

console.log(account.age)
account.updateAge(42)

################################
'use strict'
let CarThrowsError = function (color) {
    if (!new.target) throw 'CarThrowsError must be called with new'
    this.color = color;
}
let newredCarThrowsError = CarThrowsError('red')
################################
// to make variables `private` in constructor function object, use getters/setters instead
'use strict'
let PrivateVariableCar = function (_color) {
    this.getColor = function () {
        return _color;
    }
    this.setColor = function (color) {
        _color = color;
    }
}

let privateVariableCar = new PrivateVariableCar('yellow');
console.log(privateVariableCar.getColor())
privateVariableCar.setColor('green')
console.log(privateVariableCar.getColor())
console.log(privateVariableCar._color) // undefined bcoz _color property is private to constructor function's getter and setter methods
################################
  setTimeout(function(){
    this.count+=100
    console.log(`this.count in regular function in setTimeout= ${this.count}`)
  },1000
  )
How to fix it
You have a few options to make sure this inside the callback correctly refers to your object:

1. Use an arrow function (simplest and most common way)
Arrow functions inherit this from their surrounding lexical scope.

  function Counter() {
  this.count = 0;

  setTimeout(() => {
    this.count += 100;
    console.log(`count = ${this.count}`);
  }, 1000);
}

const c = new Counter();

2. Store this in a variable (old-school)
function Counter() {
  this.count = 0;
  const self = this;

  setTimeout(function() {
    self.count += 100;
    console.log(`count = ${self.count}`);
  }, 1000);
}

3. Use .bind() to bind this manually
function Counter() {
  this.count = 0;

  setTimeout(function() {
    this.count += 100;
    console.log(`count = ${this.count}`);
  }.bind(this), 1000);
}

