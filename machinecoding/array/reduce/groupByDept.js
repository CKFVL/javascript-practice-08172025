const users = [
  { id: 1, name: "A", dept: 'electrical' },
  { id: 2, name: "B", dept: 'computers' },
  { id: 3, name: "C", dept: 'electrical' },
  { id: 4, name: "C", dept: 'computers' },
  { id: 5, name: "C", dept: 'electrical' },
];

const usersbyDept=users.reduce((acc, currValue, index, array)=>{
  if(acc[currValue.dept]!== undefined){
    acc[currValue.dept].push(currValue)
  }else{
    acc[currValue.dept]=[currValue]
  }
  return acc
}, {})

console.log(usersbyDept)