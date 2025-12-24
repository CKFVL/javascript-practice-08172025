console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: '{"x":5,"y":6}'

console.log(
  JSON.stringify([new Number(3), new String("false"), new Boolean(false)]),
);
// Expected output: '[3,"false",false]'

console.log(JSON.stringify({ x: [10, undefined, function () {}, Symbol("")] }));
// Expected output: '{"x":[10,null,null,null]}'

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// Expected output: '"2006-01-02T15:04:05.000Z"'
// #######################
// https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb/c/694b5ba8-c9a4-8323-9f8a-2fc581a13718
One-Liner Summary (Very Important)
“JSON.stringify(args) is unsafe for memoization because it breaks on object order, ignores functions, collapses values, crashes on circular references, 
loses types, and is expensive. It’s okay for demos but not production.”
---
1️⃣ Key order is not guaranteed (objects)

Two objects with the same logical data can stringify differently.

const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 };

JSON.stringify(a); // '{"x":1,"y":2}'
JSON.stringify(b); // '{"y":2,"x":1}' ❌

Interview trap
memoizedFn(a); // cache miss
memoizedFn(b); // cache miss again


➡️ Same input logically, different cache keys.

Interview takeaway:
Object property order breaks cache consistency.

// ##############################################
2️⃣ Functions are silently dropped
const args = [1, () => 2];

JSON.stringify(args); // "[1,null]" ❌

Worse example
JSON.stringify({ fn: () => 5 }); // "{}"


➡️ Different inputs → same cache key.

Interview takeaway:

Functions are non-serializable and ignored.
// ##############################################
3️⃣ undefined, Symbol, and NaN collapse
JSON.stringify([undefined]); // "[null]"
JSON.stringify([NaN]);       // "[null]"
JSON.stringify([Symbol()]);  // "[null]"

Collision example
memo([undefined]);
memo([NaN]);
memo([null]);


➡️ All map to the same key.

Interview takeaway:

Distinct values collapse into identical strings.
// ##############################################
4️⃣ Dates lie unless handled carefully
const d = new Date("2024-01-01");

JSON.stringify(d); // '"2023-12-31T18:30:00.000Z"'


Problems:

Timezone conversions

Loses Date type

Deserialized value is a string

Interview takeaway:

JSON loses type information.
// ##############################################
6️⃣ Prototype & class instances are flattened
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {}
}

const u = new User("Pavan");

JSON.stringify(u); // '{"name":"Pavan"}'


➡️ Loses:

Class identity

Methods

Prototype chain

Interview takeaway:

Instances become plain objects.
---
7️⃣ Performance & memory cost (often overlooked)

Deep objects → expensive serialization

Happens on every function call

Large inputs → GC pressure

O(n) serialization cost per call


Interview takeaway:

Cache key generation should be cheap.

// ####################################
Classic Interview Follow-up Question

Interviewer:

“So how would you fix memoization keys?”

Strong answers
Option 1: Use Map with reference equality (best for objects)
const cache = new Map();

function memo(fn) {
  return function(arg) {
    if (cache.has(arg)) return cache.get(arg);
    const res = fn(arg);
    cache.set(arg, res);
    return res;
  };
}

Option 2: Stable stringify (explicitly mention trade-offs)
function stableStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

Option 3: WeakMap (gold-star answer)
const cache = new WeakMap();


➡️ No memory leaks, reference-safe.