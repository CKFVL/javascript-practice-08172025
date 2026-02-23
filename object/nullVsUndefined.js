Summary
undefined → variable declared but not assigned (automatic).
null → explicitly assigned to indicate “no value.”
They are loosely equal but strictly different.

difference between null and undefined javascript
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/693c1f08-c6b4-8324-9853-e19bbdda59c2

| Feature                     | `undefined`                                                                                       | `null`                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Meaning**                 | A variable is declared but **not assigned** any value                                             | A variable is **explicitly assigned** to represent "no value" |
| **Type (`typeof`)**         | `"undefined"`                                                                                     | `"object"` (a historical bug)                                 |
| **Default Value?**          | Yes — default value for uninitialized variables, missing function args, missing object properties | No — must be explicitly assigned                              |
| **Who sets it?**            | JavaScript engine automatically                                                                   | You, the developer                                            |
| **Use case**                | "I don’t know what the value is yet"                                                              | "There is **intentionally no value**"                         |
| **Equality (`==`)**         | `undefined == null` → `true`                                                                      | same                                                          |
| **Strict Equality (`===`)** | `undefined === null` → `false`                                                                    | different types                                               |


Examples
1️⃣ undefined cases (auto-assigned):
    let a;
    console.log(a); // undefined

    function test(x) {
      console.log(x);
    }
    test(); // undefined

    let obj = {};
    console.log(obj.value); // undefined

2️⃣ null cases (explicit assignment):
    let user = null;  // user intentionally has no value
    console.log(user); // null

    function getUser() {
      return null; // means “no user found”
    }

🧠 When to use which?
    Use undefined when:
      You want JavaScript to determine the absence of a value.
      You are checking if a variable was assigned.

    Use null when:
      You want to explicitly clear a variable.
      Indicate an intentional empty value (e.g., return null when item not found).

Common Pitfalls
  1. typeof null === "object"
  This is a known JS bug and kept for backward compatibility.

  2. undefined == null → true
  Because loose equality treats them both as “empty.”

  Always prefer strict checks:
  if (value === null) { ... }
  if (value === undefined) { ... }

Quick Practice Check
    let x = null;
    let y;

    console.log(x == y);  // true
    console.log(x === y); // false
    console.log(typeof x, typeof y); // object undefined