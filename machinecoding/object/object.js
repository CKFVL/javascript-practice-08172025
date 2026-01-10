let var1
console.log(var1)
console.log(typeof var1)

let var2=null
console.log(var2)
console.log(typeof var2)
#######
let a =3
let b=new Number(3)

console.log(a==b)
console.log(a===b)

#######
check with "use strict" mode and without "use strict" mode
let name;
nmae={}
console.log(name)

#########
const obj={1:"a",2:"b",3:"c"}
console.log(obj.hasOwnProperty("1"))
console.log(obj.hasOwnProperty(1))

const obj={hello:"a",2:"b",3:"c"}
console.log(obj.hasOwnProperty("hello"))

const obj={a:1,b:2,c:3,a:4}
console.log(obj)