function* alphabetgenerator(){
  yield "A"
  yield "B"
  yield "C"
  yield "D"
  
  return "E"
}

const letters=alphabetgenerator()

console.log(letters.next())
console.log(letters.next())
console.log(letters.next())
console.log(letters.next())
console.log(letters.next())
console.log(letters.next())
console.log(letters.next())