Promise Vs Async/await:
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb/c/6957ea1e-02b0-8322-9940-4dcd907a2c09

######################
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb/c/6957ead5-621c-8324-a709-2e6cd3825df0
######################
Tail recursion uses O(1) stack memory only if the runtime supports Tail Call Optimization.
In JavaScript, tail recursion still uses O(n) stack memory because TCO is not implemented.

######################
parseInt Vs Number()
  parseInt: Parses a number from the start of a string until it hits a non-digit.
  e.g.
    parseInt('123') // 123
    parseInt("123a") // 123
    parseInt('a123') // NaN
    parseInt('3.14') // 3

  Number: Converts the entire value into a number.
    Number('123') // 123
    Number("123a") // NaN
    Number('a123') // NaN
    Number('3.14') // 3.14
  

######################
console.log(0.1+0.2) // !0.3, why?
it results in // 0.30000000000000004

JavaScript uses IEEE 754 floating-point numbers (binary).
Some decimal fractions cannot be represented exactly in binary, including 0.1 and 0.2.
So internally:
0.1 ≈ 0.10000000000000000555
0.2 ≈ 0.20000000000000001110

Adding them results in a tiny precision error:
0.30000000000000004

console.log((0.1+0.2).toFixed(2))

