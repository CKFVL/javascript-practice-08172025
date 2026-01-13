understanding summary:
  - pass function as argument to another function
  - return function as a result

https://chatgpt.com/g/g-p-693c2d35c83c819185f2dde0fbdd798c-reactjs/c/6965e058-72b0-8323-adcc-963936bbec32

HOF can be used 
  - when behavior varies, not data (logging, validation, formatting)
  - reusable logic
  - compose behavior

###############
function createLogger(level){
  return function(msg){
    console.log(`${level} : ${msg}`)
  }
}

const infoLogger=createLogger('INFO')
infoLogger('hello')

const errorLogger=createLogger('Error')
errorLogger('not found')

#######################################
Built-in higher-order functions in JavaScript
  - map
  - filter
  - reduce
  - forEach