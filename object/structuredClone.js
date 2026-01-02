Understanding summary:
  - handles deep copy
  - preserves types
  - handles circular references
##################
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/69573164-ad40-8321-b4c6-2753faff5c1a
Traditional ways to copy objects have problems:

  Shallow copy ({ ...obj }, Object.assign) → nested objects still share references
  JSON.parse(JSON.stringify())
    Loses Date, Map, Set
    Drops undefined, Symbol
    Breaks on circular references
  Custom deep copy → complex and error-prone

👉 structuredClone solves all of this.
---
Example 1: (youtube example)
const obj={a:1, b:{c:2}}

//const spreadedObj={...obj} // spread doesn't clone nested objects, only shallow copy
//spreadedObj.b.c=5 // updates obj.b.c
//console.log(spreadedObj).// 5
//console.log(obj.b.c) // 5

const structuredObj=structuredClone(obj) // does deep copy
console.log('structuredObj', structuredObj)
structuredObj.b.c=6
console.log(structuredObj.b.c) //6
console.log(obj.b.c) // 2

---
Example 2:
const original = {
  name: "Pavan",
  created: new Date(),
  skills: new Set(["JS", "Java"]),
  meta: new Map([["exp", 16]]),
};

const copy = structuredClone(original);
copy.skills.add("Go");

console.log(original.skills); // Set { 'JS', 'Java' }
console.log(copy.skills);     // Set { 'JS', 'Java', 'Go' }

################################
Circular references (big win)
const obj = {};
obj.self = obj;
const cloned = structuredClone(obj);
console.log(cloned.self === cloned); // true

const user={
  name: 'pavan'
}
user.self=user
JSON.stringify(user)

❌ JSON.stringify would throw
✅ structuredClone works perfectly