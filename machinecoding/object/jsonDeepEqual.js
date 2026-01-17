// input: o1={"x":1,"y":2}; o2={"x":1,"y":2} - output:true
// o1={"x":1,"y":2}; o2={"y":2, "x":1} - output:true
// o1={"x":null, "L":[1,2,3]}, o2={"x":null, "L":["1","2", "3"]} - output:false

const a=[undefined]
const b={'a':1,'b':2}
const c=null

console.log(typeof a)
console.log(typeof b)
console.log(typeof c)

console.log(typeof a[0])
console.log(b[0])
console.log(a[0] === b[0]) // true: javascript converts b[0] to b['0']
// e.g. 
let o1=[undefined]
let o2={"L":[1,2,3]}
console.log(o1[0])
console.log(o2['a'])
console.log(o1[0] === o2['a'])
console.log(String(o1)===String(o2))
console.log(String(o1[0])===String(o2['a']))
console.log('##########')
let o3=[1,2,3,4]
let o4=[1,2,3]
console.log(String(o3)===String(o4))
console.log('##########')
let o5=[1,2,3,4]
let o6=["1","2","3","4"]
console.log(String(o5)===String(o6))

// o1===null and o2===null
// one of them can be object and other can be array or null or other
// if primitives
// if any of them is array, 
  // check if both are arrays
  // compare each element
// else if object
  // check if both are objects
  // compare each element
function areDeepEqual(o1, o2){
  // if both are null
  if(o1===null || o2===null){
    return o1===o2
  }
  
  // if both refer to same reference
  if(typeof o1 !== typeof o2){
    return false
  }
  
  // primitive check
  if(typeof o1 !== 'object'){
    return o1===o2
  }
  
  // 
  if(Array.isArray(o1) || Array.isArray(o2)){
    if(String(o1)!== String(o2)){
      return false
    }
    for(let i=0;i<o1.length;i++){
      if(!areDeepEqual(o1[i], o2[i])){
        return false
      }
    }
  }else{
    if(Object.keys(o1).length !== Object.keys(o2).length){
      return false
    }
    for(const key in o1){
      if(!areDeepEqual(o1[key], o2[key])){
        return false
      }
    }
    for(const key in o2){
      if(!areDeepEqual(o1[key], o2[key])){
        return false
      }
    }
  }
  
  return true
}



