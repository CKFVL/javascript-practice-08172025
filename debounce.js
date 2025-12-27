function search(str){
  console.log(str)
}

// search('Ha')
// search('Har')
// search('Hard')
// search('Hard')
// search('Hard J') 
// search('Hard JS')
// search('Hard JS i')

function debouncedSearch(fn, delay){
let timer; // If You declared timer outside debouncedSearch:  
// That makes timer global/shared, not tied to a specific debounced function.
// Why this is a problem
// If you create multiple debounced functions, they will interfere with each other
// This breaks encapsulation and violates how debounce is expected to behave
  return function(...args){
    clearTimeout(timer)
    timer=setTimeout(()=>{
      fn(...args)
    }, delay);
  }
}

let ds=debouncedSearch(search, 2000)
ds('Ha')
ds('Har')
ds('Hard')
ds('Hard')
ds('Hard J')
ds('Hard JS')
ds('Hard JS i')
##########
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
