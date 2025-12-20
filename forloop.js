let newEmployee = { id: 1, name: "Pavan", age: 40 };
let newEmployee2 = {id:23, name: 'bhogala', age: 34};
let newEmployee3 = {id:24, name: 'vani', age: 41};

let empArr=[newEmployee, newEmployee2, newEmployee3];

for(const emp of empArr){
  console.log(emp.name)
  console.log(emp.age)
  console.log('-----------')
}
console.log('$$$$$$$$$$$$$$$$$$')
for(const emp in empArr){
  console.log(emp)
  console.log(empArr[emp].name)
  console.log(empArr[emp].age)
  console.log('-----------')
}
