// Default property descriptor
// {
//   value: 'pavan',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
// https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/69466f92-2624-8322-be0c-73e871657bac
let emp={name: 'pavan'}
emp.name='guru'
console.log(emp.name)
// Objects are extensible by default, so this works.
emp.age=40
console.log(emp.age)

Object.defineProperty(emp, 'name', {configurable: true, enumerable : true, writable: false})
// Because writable: false:
// Non-strict mode → assignment fails silently
// Strict mode → throws TypeError
emp.name='kumar'
console.log(emp.name)

Object.defineProperty(emp, 'name', {configurable: false, enumerable : true, writable: true})
// configurable: false
// ❌ Cannot redefine descriptor again
// Object.defineProperty(emp, 'name', {configurable: true, enumerable : true, writable: false})
// ❌ Cannot delete
delete emp.name

emp.name='bhogala'
console.log(emp.name)

emp.dept='eee'
console.log(emp.dept)
