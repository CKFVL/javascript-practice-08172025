Use map: returns a new array and when input ➜ output transformation
Array.map() transforms an array into another array by applying a function to each element.

Use forEach when: side effects only

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/696e1c6e-1e54-8326-8bb0-1b9c1aeb1d6a

examples of map:
Basic transformation:
  const arr=[1,2,3]
  const sqarr=arr.map((_,i)=>_*_) // [1,4,9]

mapping strings:
  convert to upper case
  const arr=['guru','pavan', 'kumar']
  const uarr=arr.map(str=>str.toUpperCase())

mapping objects:
  const userarr=[{name:'pavan', age:33}, {name:'vani', age:67}
  const namearr=userarr.map(u=>u.name)

transforming object structure:
  renaming or adding fields
  const userarr=[{name:'pavan', age:30}, {name:'vani', age: 67}]
  const newuserarr=userarr.map((u,i)=>({
    userName: u.name,
    userAge: u.age,
    userId: i
  }))

  console.log(newuserarr)

using index argument:
  const arr=['a','b','c']
  const iarr=arr.map((val,i)=>`${i}.${val}`)
  console.log(iarr)

mapping nested arrays:
  const matrix=[[1,2], [3,4]]
  const mulmatrix=matrix.map(row=>row.map(n=>n*2))
  console.log(mulmatrix)  


