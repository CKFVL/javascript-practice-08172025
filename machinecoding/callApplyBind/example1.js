var obj={
  helloWorld: function(){
    return 'hello world, '+ this.name
  }, 
  name: 'Hello'
  
}
console.log(obj.helloWorld())

var obj2={
  // both objects reference the same function
  helloWorld: obj.helloWorld, 
  name:'bye'
}
// this is not determined by where the function was defined. For a normal function, it is determined by how it is called.
console.log(obj2.helloWorld())

var obj3={
  helloWorld: obj.helloWorld.bind(obj), 
  name:'bye'
}

console.log(obj3.helloWorld())

// if you don;t want to chnage the implementation of the object
console.log(obj2.helloWorld.call(obj))