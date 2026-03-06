*** Read coercion.js before this

when you call String(obj), similar to coercion rules in coercion.js, javascript performs ToPrimitive conversion with a "string" hint

When you call String(value) for arrays:
    - JavaScript tries to convert the value to a primitive.
    - For arrays, it internally calls .toString().
    - Array.prototype.toString() calls .join(",").

Example: String([3,4,5])
Step-by-step (Internal Conversion)
    Under the hood:

    String([3,4,5])
    → ToPrimitive(array)
    → array.toString()
    → array.join(",")
    → "3,4,5"

###################
console.log(String(100))
console.log(String([1,2,3]))   // "1,2,3" because Arrays override toString() → calls join()
// Plain objects use default Object.prototype.toString()
console.log(String("hello pavan"))
console.log(String({}))        // "[object Object]"