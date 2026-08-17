🧠 Mental model (interview gold)
Debounce → “run AFTER the user stops”
Throttle → “run AT MOST once per interval”
#########
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Hello World!</h1>
      <p id="currentTime"></p>
      <input id="input"></input>
      <div>
        live data:
        <span id='livespan'>
        </span>
      </div>
      <div>
        throttled data:
        <span id='throttlespan'>
        </span>
      </div>
      <script src="script.js"></script>
  </body>
</html>
---
const input=document.getElementById('input')
console.log(input.value)
//const inputtextFn=()=>
//console.log( Date.now())
const updateValue=(val)=>{
  throttlespan.innerHTML=val
}

function throttle(fn, delay){
  let prevTime=0 // 100 sec
  
  return function(...args){
    let now=Date.now()

    if(now-prevTime<delay){
      console.log('ignoring...')
      return
    }
    prevTime=now
    return fn(...args) // returns updateValue
  }
}

const throttleUpdate=throttle(updateValue,4000)

input.addEventListener('input', (event)=>{
  console.log(event.target.value)
  livespan.innerHTML=event.target.value
  //throttlespan.innerHTML=event.target.value
  throttleUpdate(event.target.value)
})