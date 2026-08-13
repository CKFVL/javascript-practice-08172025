https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/69803447-1804-8324-b0dd-a7f590ae2ced
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a7d2933-f118-83ee-bb3b-0736b12e5012

Interview point
Arrays: maintains insertion order by index
Remember this:
  Arrays maintain insertion order by index (for non-objects i.e. primitives)
  Object property ordering:
    Integer-index-like string keys → ascending order
    Other string keys → insertion order
    Symbol keys → insertion order

does array maintain insertion order in javascript
JavaScript Arrays do maintain insertion order
  For normal array elements (numeric indexes like 0, 1, 2, ...), JavaScript guarantees insertion order by index.
    const arr = [];
    arr.push('a');
    arr.push('b');
    arr.push('c');

    console.log(arr); // ['a', 'b', 'c']

You’ll always get them back in the order you inserted them.
⚠️ The subtle gotcha (arrays are objects)
Arrays are special objects. If you add non-numeric properties, those are not part of the array order.
  const arr = ['x', 'y'];
  arr.foo = 'bar';
  console.log(arr);      // ['x', 'y']
  console.log(arr.foo);  // 'bar'
foo exists (i.e., named index), but it’s not an array element and won’t show up in iteration methods like map, forEach, etc.

Example 2: const arr = []; // more details at line 75 that mentions rules
        arr[2] = "C";
        arr[0] = "A";
        arr[1] = "B";

        console.log(arr);
        Output: ["A", "B", "C"]

🔄 Iteration order (important)
  All standard array iteration methods preserve insertion order:
    for
    for...of
    forEach
    map, filter, reduce
    entries(), keys(), values()

const arr = [10, 20, 30];
for (const v of arr) {
  console.log(v);
}
// 10 → 20 → 30
❌ Deleting creates holes (but order stays)

If you delete elements, indexes remain but values become empty:
const arr = ['a', 'b', 'c'];
delete arr[1];
console.log(arr); // ['a', <empty>, 'c']

Order is preserved, but you’ve got a hole.
(Prefer splice if you want to remove and shift.)

🧠 Contrast with objects (common confusion)
      Arrays → insertion order by index
      Objects → special rules:
        1. Integer-like keys sorted
        2. Then string keys (in insertion order)
        3. Then symbols
      If order really matters for key–value pairs → use Map.

*** The key is that arrays and objects both have property keys internally, but arrays have special behavior for their indexed elements.
    1. Arrays → insertion order by index
        const arr = [];
        arr[2] = "C";
        arr[0] = "A";
        arr[1] = "B";

        console.log(arr);
        Output: ["A", "B", "C"]

    2. Objects → property key ordering rules
       Objects are different.
        const obj = {
            "10": "ten",
            "2": "two",
            "1": "one",
            "name": "Pavan",
            "age": 20
        };
        console.log(Object.keys(obj)); // ["1", "2", "10", "name", "age"]

        JavaScript orders the keys as:
          Rule 1: Integer-like keys → ascending numeric order
            "1"
            "2"
            "10"
          
          Rule 2: Other string keys → insertion order
            "name"
            "age"

          Rule 3: Symbol keys → insertion order
            const s1 = Symbol("s1");
            const s2 = Symbol("s2");
            const obj = {
                10: "ten",
                2: "two",
                name: "Pavan",
                [s1]: "symbol 1",
                age: 20,
                [s2]: "symbol 2"
            };
            console.log(Reflect.ownKeys(obj));

Conceptually:
            ["2", "10", "name", "age", Symbol(s1), Symbol(s2)]
              ↑          ↑          ↑              ↑
            integer     string     insertion       symbols
            keys        keys       order           insertion order
            ascending

*** And don't confuse this with Map. A Map guarantees pure insertion order for all its keys, 
    regardless of whether the keys are numbers, strings, objects, or symbols.
#################################################################
✅ Final takeaway
    ✔ JavaScript arrays do maintain insertion order
    ✔ Safe to rely on this behavior
    ❌ Don’t treat arrays like objects with random keys