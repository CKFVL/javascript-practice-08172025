✅ 1. Using .map() (recommended – immutable)
const arr = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" }
];

const updated = arr.map(obj =>
  obj.id === 2 ? { ...obj, name: "Updated B" } : obj
);

console.log(updated);

👉 Key idea:

Loop through array
When condition matches → return updated object
Else → return original object
✅ 2. Using .find() (mutates original)
const obj = arr.find(o => o.id === 2);
if (obj) {
  obj.name = "Updated B";
}

console.log(arr);

👉 This directly modifies the original array.

✅ 3. Using index + direct update (mutates)
const index = arr.findIndex(o => o.id === 2);

if (index !== -1) {
  arr[index].name = "Updated B";
}

console.log(arr);
✅ 4. Updating nested property
const arr = [
  { id: 1, user: { name: "A" } },
  { id: 2, user: { name: "B" } }
];

const updated = arr.map(obj =>
  obj.id === 2
    ? { ...obj, user: { ...obj.user, name: "Updated B" } }
    : obj
);
⚠️ When to use what?
React / state updates → ALWAYS use .map() (immutability)
Plain JS scripts → mutation is fine if intentional
💡 Mental model

Think of .map() as:

“Create a new array, but replace only the matching object”