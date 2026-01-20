func =()=> checkIfInstanceOf(new Date(), Date)
func =()=> checkIfInstanceOf(5, Number)
func = () => {
  class Animal {}
  class Dog extends Animal{};
  return checkIfInstanceOf(new Dog(), Animal)
}

function checkIfInstanceOf(obj, classFunction){
  if(obj===null || obj===undefined || typeof classFunction!=='function'){
    return false
  }
  
  let objPrototype=Object.getPrototypeOf(obj)
  
  while(objPrototype!==null){
    //console.log(objPrototype)
    if(objPrototype===classFunction.prototype){
      return true
    }
    
    objPrototype=Object.getPrototypeOf(objPrototype)
    
  }
  return false
}

console.log(checkIfInstanceOf('sdfd', Number))
console.log(checkIfInstanceOf([], Array));             // true
console.log(checkIfInstanceOf({}, Object));            // true
console.log(checkIfInstanceOf(() => {}, Function)); 

class OldAnimal{
  
}
class Animal{
  
}
class Dog extends Animal{
  
}
let dog=new Dog()
console.log(checkIfInstanceOf(dog, Animal));
console.log(checkIfInstanceOf(dog, OldAnimal));