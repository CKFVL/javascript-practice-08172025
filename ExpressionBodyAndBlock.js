Key rule:
👉 Parentheses () mean “expression body”, not a block.

Using {} like this means JavaScript block, not JSX return.

You need either:
  Parentheses (...) for returning JSX (implicit return), or
  Use return inside {}.

🧠 Key points
  🔹 When you use { } inside the arrow function → it becomes a block → MUST return
Example:
items.map(item => { 
  return <li>{item}</li>;
});

🔹 When you use ( ) → React treats it as an implicit return
Example:
items.map(item => (
  <li>{item}</li>
));
############
const excludeMap=new Map();
  
  excludes.forEach(({k,v})=>{
    if(!excludeMap.has(k)){
      excludeMap.set(k,v)
      return
    }
    
    excludeMap.get(k).add(v);    
}

---
const excludeMap=new Map();
  
  excludes.forEach(({k,v})=>(
    if(!excludeMap.has(k)){
      excludeMap.set(k,v)
      return
    }
    
    excludeMap.get(k).add(v);
    
  )
  )

why second version fails?
excludes.forEach(({k,v}) => (
  if (!excludeMap.has(k)) {
    excludeMap.set(k, v)
  }
  excludeMap.get(k).add(v);
))

Arrow functions have two forms:
1️⃣ Expression body (NO statements allowed)
(arg) => expression
Example:
x => x * 2

🚫 if is a statement, not an expression
So JS throws:
SyntaxError: Unexpected token 'if'
Why the first version works ✅
excludes.forEach(({k,v}) => {
  if (!excludeMap.has(k)) {
    excludeMap.set(k, v)
    return
  }
  excludeMap.get(k).add(v);
})

Curly braces {} = block body
  Allows statements (if, for, return)
  Requires explicit return
  This is the correct syntax when you need control flow.
