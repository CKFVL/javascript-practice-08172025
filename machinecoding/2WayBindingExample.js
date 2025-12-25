// if input element already available on html
const input=document.getElementById('input')
// otherwise
// const input = document.createElement('input')
// document.body.appendChild(input)

input.value=''
console.log(input.value)

const state={value:'Hi'}

function bind(state, key, input){
  // initialize UI from state
  input.value=state[key]
  console.log(input.value)
  // UI--> state
  input.addEventListener('change', (event)=>{
    state[key]=event.target.value
  })
  
  // state --> UI
  // Object.defineProperty:Intercepts state changes and Enables reactivity
  // You can think of Object.defineProperty as:
  // “A hook that runs code whenever a property is read or written.”
  // In that sense, it feels like a listener on a state object.
  // What Object.defineProperty Actually Is
  // Object.defineProperty redefines how a property behaves by installing:
     // a getter → runs on read
     // a setter → runs on write
     // Object.defineProperty(state, 'value', {
     //    get() { ... },
     //   set(newValue) { ... }
     //  });
     // From that moment on:
     // state.value        // → getter runs
     // state.value = 10   // → setter runs
  let value=state[key]
  Object.defineProperty(state, key, {
    get(){
      return value;
    },
    set(newValue){
      value=newValue
      input.value=newValue
    }
  })
}

bind(state, 'value', input)
// init
console.log(state)

setTimeout(function() {
  
// UI --> state
input.value='hello'
input.dispatchEvent(new Event('change'))

console.log(state)
}, 3000);

// state --> UI
state.value='bye'
console.log(state.value)
console.log(input.value)