let str='abefcdghikopyxz'

function stringWithAlphabeticalOrder(aplphastr){
  let ascicodeArr=aplphastr.split("").map(c=>c.charCodeAt(0)).sort((x,y)=>(x-y))
  console.log(ascicodeArr)
  let charArray=ascicodeArr.map(n=>String.fromCharCode(n))
  return charArray
}

console.log(stringWithAlphabeticalOrder(str))