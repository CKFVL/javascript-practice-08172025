let a=5
let b=10
// swap
// let temp=a
// a=b
// b=temp
// console.log(a,b)

// OR
[a,b]=[b,a]
console.log(a,b)


The syntax:
  [a, b] = [b, a] is called array destructuring assignment
shortest way to swap values between variables

Instead of writing:
  let temp = a
  a = b
  b = temp

you can simply do:
  [a, b] = [b, a]

right side [b,a] means it creates a temporary array with swapped values
Left side:
[a, b]

→ destructures (unpacks) that array into variables
So effectively:
a = b
b = a (original value)

Example:
  let a = 1
  let b = 2
  [a, b] = [b, a]
  console.log(a, b) // 2 1

Take values from the right array and assign them positionally to the left variables.