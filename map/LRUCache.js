// LRU Cache
class LRUCache{
  constructor(limit){
    this.limit=limit
    this.lruMap=new Map()
  }
  
  // map maintains insertion order
  // store: 
  //      new element: insert + mark as most recently used i.e., move it to end
  //      update element: update value + move to most recently used i.e., move it to end
  
  // get: 
  //      return value | move to most recently used i.e., move it to end
  
  // capacity exceeded: 
  //      remove least recently used element
 
 // store: 
 set(key, value){
   // element already exists
   // delete and move it to end
   if(this.lruMap.has(key)){  
     lruMap.delete(key)
   }
   // new element
   // if capacity reaches the limit
   else if(this.lruMap.size===this.limit){// delete least recently used element
     const oldestKey=this.lruMap.keys().next().value; // i.e. first value
     this.lruMap.delete(oldestKey)
   }
   
   this.lruMap.set(key,value)
 }
 
 // delete and add it at end
 get(key){
   if(!this.lruMap.has(key)){
     return null
   }
   
   const val=this.lruMap.get(key)
   this.lruMap.delete(key)
   this.lruMap.set(key, val) // move it to end
   return val;
 }
}

const lrucache=new LRUCache(3)
lrucache.set('a','a')
console.log(lrucache.get('a'))
lrucache.set('b','b')
console.log(lrucache.get('b'))
lrucache.set('c','c')
console.log(lrucache.get('c'))

lrucache.set('d','d')
console.log(lrucache.lruMap)