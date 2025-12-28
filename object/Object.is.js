console.log(NaN===NaN)
console.log(10===10)
console.log(0===-0)
console.log(0===NaN)
console.log('----------')
console.log(Object.is(10,10))
console.log(Object.is(0, NaN))
 // except below, Object.is() can be used safely
console.log(Object.is(NaN, NaN))
console.log(Object.is(0,-0))


