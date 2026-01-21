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

#########
console.log([]==[])
console.log([]===[])

########
// get common values
const input1={a:1, b:2, c:3, d:10, e:12}
const input2={a:2, e:12, f:6, d:10}
// output={d:10, e:12}
let resobj={}
for(const [key,value] of Object.entries(input1)){
  if(Object.hasOwn(input2, key)){
    if(input2[key]===value){
      resobj[key]=value // do not use spread because its unnecssary to maintain immutability
      }
    }
}

console.log(resobj)

Loops / algorithms → resobj[key] = value
State updates (React/Redux) → spread + computed key
