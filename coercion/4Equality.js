Strict equality (===)
No coercion
  5 === '5' // false

Loose equality (==)
  coercion happens

  Important rules:
  1. String Vs Number
    '5' === 5 // true

  2. Boolean: boolean is converted to number first
     true == 1 // true
     false == 0 // true

  3. null & undefined
     null === undefined // true
     null == 0 // false

  4. Object comparison
     [] == '' //true
     [] == 0 //true
     [1] == 1 // true

     Objects -> converted using:
      1. valueOf()
      2. toString()

The + operator special case
  refer +coercion.js file

##################
  Object -> primitive (arrays are objectToJSONString, so JS tries to cobvert [] to primitive)
    valueOf()
    toString()

  e.g., []=== false // true

  Step 1: Boolean -> Number
    false -> 0
    now comparison becomes:
    [] === 0

  Step 2: Object -> primitive
  Arrays are objects, so JS tries to convert [] to primitives
    It does this using: 
      valueOf()
      toString()

  Step 3: [].toString()
  Array.toString() joins elements with commas
  empty array -> nothing to join -> empty string

  Step 4: String -> Number
  "" -> 0

  Final comparison:
    0 === 0 -> true

Similar examples:
  [] == ''      // true
  [] == 0       // true
  [1] == 1      // true


Weird but Important Cases
[] == []          // false  (different references)
[] == ![]         // true 😵

Why?
![] → false
[] == false
[] → '' → 0
false → 0
0 == 0 → true