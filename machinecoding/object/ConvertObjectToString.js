//https://www.youtube.com/watch?v=f94fUbHU-FY&list=PLQpVsaqBj4RIpDQIVowFni58LsK4cM9Qz&index=18
given an object, return a valid JSON string of that object.
assume object includes string, integers, arrays, objects, booleans and null
the order of keys should be same as order returned by Object.keys()

solve it without using built-in JSON.stringify method

Input: object={"y":1, "x":2}
Output: {"y":1, "x":2}

#########
// strings, integers, arrays, objects, booleans and null
console.log(String(null))
console.log(typeof null)
console.log(typeof false)
console.log(typeof 4)
console.log(String(undefined))
console.log(typeof undefined)
console.log('4')
console.log("4")
console.log(["4"])
console.log(['4'])
console.log('###############')
console.log(String('4'))
console.log(String("4"))
console.log(String(["4"]))
console.log(String(['4']))

console.log(Array.isArray([4]))
//################
// obj={"y":1, "x":2, "z":"pavan", "myArr": [1,"2",3],"arr":[1, "guru", {"100":"hundred"}]}, "b":false, "n":null, "und": undefined}
function objectToJSONString(obj){
  // null or undefined
  if(obj===null || obj===undefined) return String(obj)
  
  // array
  if(Array.isArray(obj)){
    // let res=""
    // for(let i=0;i<obj.length;i++){
    //   res= res+objectToJSONString(obj[i])+","
    // }
    // return res
    // OR
    let values=obj.map(e=>objectToJSONString(e))
    return `[${values.join(",")}]`
  }
  
  // object {}
  if(typeof obj ==='object'){
    const pairs=Object.keys(obj).map(key=>`"${key}":${objectToJSONString(obj[key])}`)
    return `{${pairs.join(",")}}`
  }
  
  // string
  if(typeof obj==='string'){
    return `"${String(obj)}"`
  }  
  
  // primitives or booleans
  return String(obj)

}

// let stringify=objectToJSONString({"y":1, "x":2})
// console.log(stringify)

let stringify=objectToJSONString({"y":"1", "x":"2", "z":33, "arr":[1,2,3], "marr":[1,"2",3], "bool":false, "objin": {"name":'pavan'}})
console.log(stringify)
