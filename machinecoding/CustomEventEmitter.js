Observer pattern:
	-	subscribers subscribe to the event notifications
	-	Publisher publishes events
Publisher has list of subscribers and their event handling functions
	addSubscriber(subscriber)
	removeSubscriber(subscriber)	

whenever an event happens, publisher goes over it's subscribers and calls the specific notification method on their objects

on(event, listener) --> subscribes a listener function to an event
emit(event, ...args) --> calls all listeners associated with the event
off(event, listener) --> removes a specific listener from an event
once(event, listener) --> regsiters a listener that runs only once

###########
https://www.youtube.com/watch?v=Gz8NVkPxOiM&list=PLinedj3B30sDi0keEOQU3n5p3Op28eN2e&index=9
class MyEventEmitter{
  constructor(){
    this.__event_listeners={
      // add subscribers to a specific event array in __event_listeners object
      // e.g. [event]: listener[]
    }
  }
  
  on(event, listener){
    // register the [listener] for [event]
    if(!this.__event_listeners[event]){
      this.__event_listeners[event]=[]
    }
    
    this.__event_listeners[event].push(listener)
    return true;
  }
  
  emit(event, ...args){
    if(!this.__event_listeners[event]){
      return false
    }
    
    const listeners=this.__event_listeners[event]
    listeners.forEach((listener)=>listener(...args))
    return true;
  }
  
  off(event, listener){
    if(!this.__event_listeners[event]){
      return false;
    }
    
    this.__event_listeners[event]=this.__event_listeners[event].filter((l)=>l!==listener)

    if (this.__event_listeners[event].length === 0) {
      delete this.__event_listeners[event];
    }
  }
  
  once(event, listener){
    // simply
    //listener(...args)
    // OR
    const wrapperFn=(...args)=>{
      listener(...args)
      this.off(event, wrapperFn)
    }

    return this.on(event, wrapperFn)
  }
}

const eventEmitter=new MyEventEmitter();
eventEmitter.on('user:signup', (username)=>console.log('user signup', username))
eventEmitter.on('user:signup', (username)=>console.log('sending email to', username))

const smsActivity=(username)=>console.log('sending sms to', username)
eventEmitter.on('user:signup', smsActivity) // adds listener
eventEmitter.emit('user:signup', 'pavan') // notifies all
console.log('--- removing listener ---')
eventEmitter.off('user:signup', smsActivity) // remove listener
eventEmitter.emit('user:signup', 'pavan') // notifies all
// adds listener
console.log('--- adding listener ---')
eventEmitter.on('user:signup', smsActivity) // adds listener
eventEmitter.emit('user:signup', 'pavan') // notifies all

// calls once
const logoutActivity=(username)=>console.log('logout user:', username)
eventEmitter.once('user:logout',logoutActivity)
eventEmitter.emit('user:logout', 'pavan')

eventEmitter.emit('user:logout', 'pavan') // no output