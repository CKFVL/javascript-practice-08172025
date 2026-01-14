Array.prototype.myMap=function(callback, thisArg){
  const result=[]
  for(let i=0;i<this.length; i++){
    if(i in this){
      result[i]=callback.call(thisArg, this[i], i, this)
    }
  }
  
  return result;
}

const arr=[1,2,3]

const multiplier={
  factor:3
}
let mynewmap=arr.myMap(function(n){
  return n*this.factor
}, multiplier)

console.log(mynewmap)