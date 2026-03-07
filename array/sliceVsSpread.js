both slice and spread are used to copy arrays
slice creates a shallow copy of the part (or all) of an array
Characteristics:
  Returns a new array
  Does not modify the original array
  Can copy specific ranges
    const arr = [1,2,3,4,5];
    const copy = arr.slice();
    console.log(copy); // [1,2,3,4,5]
  With indexes
    const part = arr.slice(1,4);
    console.log(part); // [2,3,4]

spread:
  Spread expands iterable elements into a new array.
    const arr = [1,2,3,4,5];
    const copy = [...arr];
    console.log(copy); // [1,2,3,4,5]
Common use cases:
    Copy array:
      const copy=[...arr]
    merge array:
      const merged=[...arr, 7, 8]
    insert elements:
      const insertarr=[1,2,...arr,7,8,9]

Key differences:
| Feature            | `slice()`                | Spread (`...`)    |
| ------------------ | ------------------------ | ----------------- |
| Purpose            | Extract portion of array | Expand elements   |
| Copy full array    | `arr.slice()`            | `[...arr]`        |
| Copy partial array | `arr.slice(1,3)`         | ❌ not directly    |
| Merge arrays       | ❌ not natural            | `[...a, ...b]`    |
| Works on iterables | ❌ arrays only            | ✅ any iterable    |
| Syntax             | Method                   | Language operator |

When to use what
  Use slice()
  When extracting part of an array
  When you want index-based copying
  arr.slice(2,5)

  Use spread
  When merging arrays
  When adding elements
  When working with iterables
  [...arr, 6]