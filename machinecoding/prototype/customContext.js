class Person{
  name='pavan'
  
  printName(){
    console.log('name is '+ this.name)
  }
  
  printWithWrapper(context){
    this.printName.apply(context)
  }
}

const person=new Person()
person.printName()

person.printWithWrapper({name:'guru'})
person.printName()

person.printWithWrapper(person)
person.printName()


Function.prototype.callPolyFill=function(context, ...args){
  return this.apply(context, args)
}

function incrementByNum(num){
  this.count+=num
  return this.count
}

console.log(incrementByNum.callPolyFill({count:100}, 5))