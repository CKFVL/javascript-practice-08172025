// validate('{}[]()') // true
// validate('{[()]}') // true
// validate('{[}]') // false
// validate('{{}).// false

const charMap=new Map();
charMap.set('{','}')
charMap.set('[',']')
charMap.set('(',')')
// console.log(charMap)
function validate(syntaxStr){
  if(syntaxStr.length%2!==0){
    console.log('invalid string')
    return
  }
  
  let strArray=syntaxStr.split('')
  //console.log(strArray)
  let isValidstartend=true
  let isValidconsec=true
  
  //0, arr.length-1-startIndex
  for(let i=0;i<strArray.length/2;i++){
    if(charMap.get(strArray[i])!==strArray[strArray.length-1-i]){
      isValidstartend=false;
      break;
    }
  }
  
  for(let i=0;i<strArray.length;i+=2){
    if(charMap.get(strArray[i])!==strArray[i+1]){
      isValidconsec=false;
      break;
    } 
  }
  
  console.log('isValid', isValidconsec || isValidstartend )
}

validate('{}[]()')
console.log('###################')
validate('{[()]}')
console.log('###################')
validate('{[}]')
console.log('###################')
validate('{{}')
console.log('###################')

#################################
The Golden Rule 🧠
Use a stack when the last thing you saw must be the first thing you resolve.

If you recognize LIFO (Last-In, First-Out) behavior, a stack is usually the right tool.
“Must close / undo / reverse” problems
Keywords to listen for:
  “match”
  “close”
  “undo”
  “back”
  “reverse”

Examples:
Balanced brackets
Undo / redo
Browser back button
Parentheses evaluation
📌 Undo / close → stack

Final Takeaway
Stacks solve problems where the past matters in reverse order.
Once you start seeing nesting, undoing, or backtracking, your brain should immediately think:
🧠 “This smells like a stack.”

function validate(str){
  if(str.length%2!==0){
    return false
  }
  
  let stack=[]
  let pairs={
    '{':'}',
    '(':')',
    '[':']'
  }
  
  for(let i=0;i<str.length;i++){
    let charAt=str[i]
    if(charAt==='{' || charAt==='(' || charAt==='['){
      stack.push(charAt)
    }
    
    if(charAt==='}' || charAt===')' || charAt===']'){
      if(pairs[stack.pop()]!==charAt){
        return false
      }
    }
    
    return true;
  }
  
}

console.log(validate('{}[]()'))
console.log(validate('{[()]}'))
console.log(validate('{}['))
console.log(validate(']()'))