function multiply(num1){
  return (num2) => num1*num2
}

const mult=multiply(2)
console.log(mult(3))