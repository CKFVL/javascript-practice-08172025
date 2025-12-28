const obj={a:1, b:{c:2}}

//const spreadedObj={...obj} // spread doesn't clone nested objects, only shallow copy
//spreadedObj.b.c=5 // updates obj.b.c
//console.log(spreadedObj).// 5
//console.log(obj.b.c) // 5

const structuredObj=structuredClone(obj) // does deep copy
console.log('structuredObj', structuredObj)
structuredObj.b.c=6
console.log(structuredObj.b.c) //6
console.log(obj.b.c) // 2
