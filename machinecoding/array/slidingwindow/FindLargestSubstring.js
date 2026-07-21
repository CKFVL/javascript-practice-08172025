// ABCDDDDEFGHI
// upper case: 65 - 90
// lower case: 97 - 122
let str='ABCDDDDEFGHI'
let strCharArr=str.split("")
//console.log(strCharArr[0].charCodeAt(0))
let strCode=strCharArr[0].charCodeAt(0)
let largestSequence=[strCode]
console.log(largestSequence)
let prevCharCode=0
for(let i=1;i<strCharArr.length;i++){
  let curchar=strCharArr[i].charCodeAt(0)
  console.log('curchar',curchar)
  console.log('strcode', strCode)
  if(curchar===strCode+i){
    console.log('+++', curchar)
    largestSequence.push(curchar)
    console.log('largestSequence',largestSequence)
  }
  else if(prevCharCode===strCode){
    console.log('-$$$--', curchar)
    largestSequence.push(prevCharCode)
    strCode=strCode+i
  }
  else{
    console.log('-----',curchar)
    console.log('largestSequence',largestSequence)
    if(prevCharCode===0){
      prevCharCode=strCode+i-1
      strCode=strCode+i-1
      largestSequence=[]
    }
}
}
console.log(largestSequence)