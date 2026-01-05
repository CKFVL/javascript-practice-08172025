console.log(foo)
foo=1 // ReferenceError: foo is not defined

console.log(foo)
var foo=2 // undefined

foo=3
console.log(foo)
var foo // 3