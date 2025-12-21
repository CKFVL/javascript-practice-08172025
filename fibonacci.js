By the standard Fibonacci definition used in CS, F(2) = 1.

Iterative Fibonacci:
function fibonacciIterativeNonStandard(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  let prev = 1, curr = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

console.log(fibonacciIterativeNonStandard(2)); // 2

Complexity:
Time: O(n)
Space: O(1)

✅ Best choice for production code
No stack overflow, no extra memory.
------
Recursive Fibonacci:
function fibonacciRecursive(n){
  if(n<2) return n;
  
  return fibonacciRecursive(n-1)+fibonacciRecursive(n-2)
}

console.log(fibonacciRecursive(7))

Complexity
Time: O(2^n) ❌
Space: O(n) (call stack)

❌ Why it’s bad
Recalculates the same values again and again
Very slow for large n
---
Fibonacci with Memoization (Recursive + Closure)
Definition

Stores previously computed results to avoid recomputation.
function fibonacciMemoized() {
  const memo = {};
  return function fib(n) {
    if (n < 2) return n;
    if (memo[n]) return memo[n];
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
  };
}

const fib = fibonacciMemoized();
console.log(fib(7)); // 13
Complexity
Time: O(n)
Space: O(n)

✅ Shows:
Closure
Optimization
Dynamic Programming
---
Generate Fibonacci Series (0 → N)
function fibonacciSeries(n) {
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }

  return result;
}

console.log(fibonacciSeries(7));
// [0, 1, 1, 2, 3, 5, 8, 13]
