let num=99.99
console.log(Number.isInteger(num))
num=100
console.log(Number.isInteger(num))

#########
let num=99.99
if(num%1===0){
  console.log('### is integer')
}

num=50
if(num%1===0){
  console.log('@@@ is integer')
}

num=37
if(num%1===0){
  console.log('&&& is integer')
}
