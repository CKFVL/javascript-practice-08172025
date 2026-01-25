const total=arr.reduce((sum,n)=>sum+n,0)
console.log(total)

const result=arr.map(n=>total-n)
console.log(result)
