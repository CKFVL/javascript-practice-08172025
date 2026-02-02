https://www.youtube.com/watch?v=M69bjWFarU0&list=PLQpVsaqBj4RIpDQIVowFni58LsK4cM9Qz&index=27
https://leetcode.com/problems/event-emitter/description/
design event emitter with 2 methods:
  -  subscribe: takes 2 args (name, callback)
      will be called later when the event is emitted
      an event should be able to have multiple listeners for the same event.
      when emitting an event with multiple callbacks, each should be called in the order in which they were subscribed.
      An array of results should be returned. (assume no callbacks passed to subscribe are referentially identical)

      the subscribe method should also return an object with an unsubsccribe method that enables the user to unsubscribe method that enables the user to unsubscribe.
      when it is called, the callback should be removed from the list of subscriptions and undefined should be returned

  - emit: This method takes in two arguments: the name of an event as a string and an optional array of arguments that will be passed to the callback(s). 
          If there are no callbacks subscribed to the given event, return an empty array. Otherwise, return an array of the results of all callback calls in the order 
          they were subscribed

// 
class EventEmitter {
    constructor(){
      this.eventMap=new Map([])
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if(this.eventMap.has(eventName)){
          let eventArr=this.eventMap.get(eventName)
          eventArr.push(callback) // Set also can be used instead of array
        }else{
          this.eventMap.set(eventName, [callback])
        }
        return {
            unsubscribe: () => {
              if(this.eventMap.has(eventName)){
                console.log('event found', eventName)
                return this.eventMap.delete(eventName)?undefined:[]
              }
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
      const callbackArray=this.eventMap.get(eventName) || []
      return callbackArray.map(cb=>cb(...args))
      
    }
}

const emitter=new EventEmitter();
function onClickCallback(){return 99}
function onClickCallback2(){return 999}
const sub1=emitter.subscribe('onClick', onClickCallback)
const sub2=emitter.subscribe('onClick', onClickCallback2)

console.log(emitter.eventMap)
console.log(emitter.emit('onClick'))

console.log(sub1.unsubscribe())
console.log(emitter.emit('onClick'))
