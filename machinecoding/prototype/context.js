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