https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea/c/694e30a9-1438-8323-83e9-26134d916824
Understanding GEC explains:
  - Global Object
  - this behavior
  - TDZ
  - hoisting
  - call stack & recursion
  - why functions work before declaration
-----------------------------------------
In JavaScript, the Global Execution Context (GEC) is the first execution context that the JavaScript engine creates 
when a script starts running.

Think of it as the default environment where all top-level code is executed.

1️⃣ What exactly is the Global Execution Context?
It is an object-like structure that contains:
  Global Object
  this binding
  Memory (variable environment)
  Execution phase
  Only one Global Execution Context exists per JavaScript program.

2️⃣ What does the Global Execution Context contain?
🔹 1. Global Object
      In browser → window
      In Node.js → global
      In modern JS → globalThis

      Example:
      var a = 10;
      console.log(window.a); // 10 (browser)

🔹 2. this in Global Context
      In non-strict mode (browser) → this === window
      In strict mode → this === undefined
      In Node.js → this === module.exports
      console.log(this); // window (browser, non-strict)

🔹 3. Memory Creation Phase (Hoisting phase)
      Before executing any code, JS scans the entire file and allocates memory:

      Declaration	Stored as
      var	undefined
      let / const	Uninitialized (TDZ)
      function	Entire function definition

      Example:
      console.log(a); // undefined
      var a = 10;

      foo(); // works
      function foo() {
        console.log("hello");
      }

🔹 4. Execution Phase
      Now JS executes code line by line and assigns actual values.
      var a = 10;  // a becomes 10

3️⃣ Visual representation
    Global Execution Context
    │
    ├── Global Object (window)
    ├── this → window
    ├── Memory Phase
    │   ├── a → undefined
    │   ├── foo → function
    │
    └── Execution Phase
        ├── a = 10
        ├── foo()

4️⃣ Relationship with Call Stack
GEC is pushed first onto the Call Stack
It stays until the program finishes

Function calls create new Execution Contexts on top of it
function one() {
  two();
}
function two() {
  console.log("hi");
}
one();


Call Stack:
| two() 
| one() |
| Global |

5️⃣ Why interviewers care about this
Understanding GEC explains:
Hoisting
this behavior
TDZ (Temporal Dead Zone)
Call Stack & recursion
Why functions work before declaration

6️⃣ One-line summary (interview-ready)
Global Execution Context is the first execution context created by JavaScript, where global code runs, variables are hoisted, this is bound, and the global object is created.