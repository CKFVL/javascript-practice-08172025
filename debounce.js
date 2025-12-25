<!DOCTYPE html>
<html>
  <head>
    <title>Test debounce</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
      <h1 class="title">Test debounce </h1>
      <input id="input"></input>
      <div>
        <b>default text</b>
        <span id="default">
          
        </span>
      </div>
      
      <div>
        <b>debounced text</b>
        <span id="debounce">
          
        </span>
      </div>
      
      <script src="script.js"></script>
  </body>
</html>

##########
const input=document.getElementById('input')

const defaulttext=document.getElementById('default')
const debouncedtext=document.getElementById('debounce')

const updatedDeounceTextFn=debounce((text)=>
(
  debouncedtext.textContent=text
), 1000
)

input.addEventListener('keyup', (event)=>{
  defaulttext.textContent=event.target.value
  updatedDeounceTextFn(event.target.value)
})

function debounce(fn, delay){
  let timer
  
  return (...args)=>{
  clearTimeout(timer)
  
  timer=setTimeout(()=>{
    fn(...args)
  },delay)  
  }
  
}

