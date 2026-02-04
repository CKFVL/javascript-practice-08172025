const obj={
  name:'pavan',
  address: { street: '1/2 A', city: 'Hyd', state: 'telangana'}
}

const updateObj={...obj, country: 'India'}

console.log(updateObj)

// Rule of thumb: Copy every level you change.
const updateObj2={...obj, address:{...obj.address, city:'delhi'}}
console.log(updateObj2)