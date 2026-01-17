class TimeLimitedCache{
   cache=new Map()
  constructor(){
    
  }
  
  // if key not exists, then insert
  // if key doesn't exist, then replace the value of key
  set(key, value, duration){
    const alreadyExists=this.cache.get(key)
    
    if(alreadyExists){
      //this.cache.set(key, value)
      clearTimeout(alreadyExists.timeoutId)
    }
    
    const timeoutId=setTimeout(()=>{
      this.cache.delete(key)
    }, duration)
    
    this.cache.set(key, {value, timeoutId})
    return Boolean(alreadyExists)
  }
  
  //
  get(key){
    if(this.cache.has(key)){
      return this.cache.get(key).value
    }
    return -1
  }
  
  // count
  count(){
    return this.cache.size
  }
}

let tc=new TimeLimitedCache()
console.log(tc.get(1))
tc.set(1, 'pavan', 1000)
tc.set(2, 'gurupavan', 1000)
console.log(tc.count())
console.log(tc.get(1))
tc.set(1, 'pavankumar', 3000)
console.log(tc.get(1))

console.log(tc.count())



