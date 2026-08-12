https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6a7bc8e5-b354-83ee-9b84-f966efa7da33
Summary:
    -   Array Literal
    -   constructor [new Array()]
    -   Array.of
    -   Array.from: Used to create an array from an iterable or array-like object (refer iterable.js and array-from.js)
    -   Array.prototype.fill: used to create an array with repeated values
    -   Spread operator: create a new array from an iterable
###############################################################################################
1. Array literal — most common
    const arr = [10, 20, 30];
    console.log(arr); // [10, 20, 30]
    ✅ Preferred in most cases.

---
2. new Array()
    const arr = new Array(10, 20, 30);
    console.log(arr); // [10, 20, 30]
    Equivalent to:
    const arr = [10, 20, 30];
    But there is an important special case:

    const arr = new Array(3);
    console.log(arr); // [empty × 3]
    console.log(arr.length); // 3

    This creates an array with length 3, but no actual elements.
    Compare:
        const a = new Array(3);
        const b = [3];
        console.log(a); // [empty × 3]
        console.log(b); // [3]
        Interview point: new Array(3) does NOT create [3].
---
3. Array.of()
    const arr = Array.of(10, 20, 30);
    console.log(arr); // [10, 20, 30]

    The important difference:
    Array.of(3);      // [3]
    new Array(3);     // [empty × 3]
    So Array.of() avoids the special behavior of new Array(number).
---
4. Array.from(): refer array-from.js file

---
5. Spread operator: You can create a new array from an iterable:
    const set = new Set([10, 20, 30]);
    const arr = [...set];
    console.log(arr); // [10, 20, 30]

    copying an array:
    const original = [1, 2, 3];
    const copy = [...original];
    console.log(copy); // [1, 2, 3]
---
6. Array.prototype.fill()
    const arr = new Array(5).fill(0);
    console.log(arr); // [0, 0, 0, 0, 0]

    OR

    const arr = new Array(3).fill("hello");
    console.log(arr); // ['hello', 'hello', 'hello']

    OR

    Be careful with objects:
    All three positions reference the same object.
        const arr = new Array(3).fill({}); 
        arr[0].name = "Pavan";
        console.log(arr);
        // [{name: 'Pavan'}, {name: 'Pavan'}, {name: 'Pavan'}]
    Use Array.from() for independent objects