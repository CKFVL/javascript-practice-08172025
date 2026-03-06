Understanding summary:
JSON:
  JSON properties are double-quoted
  JSON allows only string, boolean, number, array, object, null
  drops property with undefined value
  arrays with undefined becomes null
  functions are not serializable
  Dates become ISO strings
  NaN, infinity and -infinity will be treated as null
  custom serialization: toJSON() overrides default serialization

1️⃣ Object Literal (JavaScript Object)
An object literal is a way to create an object directly in JavaScript.

const person = {
  name: "Pavan",
  age: 40,
  isAdmin: true,
  greet() {
    console.log("Hello");
  }
};

Key characteristics
Exists inside JavaScript runtime
Can contain:
functions (methods)
undefined
symbols

Property names do not need quotes
Trailing commas are allowed
Used for logic, behavior, state

2️⃣ JSON (JavaScript Object Notation)
JSON is a data-exchange format, not a JavaScript object.
{
  "name": "Pavan",
  "age": 40,
  "isAdmin": true
}

Key characteristics
Text format (string)
Language-independent (used between client ↔ server)
Used for data transfer & storage
Very strict syntax

3️⃣ Key Differences (Side-by-Side)
Feature	            Object Literal	      JSON
Type	              JavaScript object	    String (text)
Purpose	            Programming logic	    Data exchange
Functions allowed	  ✅ Yes	                ❌ No
undefined allowed	  ✅ Yes	                ❌ No
Comments allowed	  ✅ Yes (JS)	            ❌ No
Keys without quotes	✅ Yes	                ❌ No
Trailing commas	    ✅ Yes	                 ❌ No
Can be parsed directly	Already usable	Needs parsing

4️⃣ Conversion Between Them
JS Object → JSON
const obj = { name: "Pavan", age: 40 };
const json = JSON.stringify(obj);

JSON → JS Object
const json = '{"name":"Pavan","age":40}';
const obj = JSON.parse(json);

⚠️ Functions are dropped during JSON.stringify
JSON.stringify({
  x: 1,
  fn: () => {}
}); 
// {"x":1}
----------------------------
Simple Mental Model
Object Literal = Live JavaScript object
JSON = String representation of data
##########################################
https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6946425e-c3b0-8320-adb5-36241cb9941e
How to safely parse untrusted JSON?
Ideal Interview Answer (Short & Strong)
“To safely parse untrusted JSON, I wrap JSON.parse in try/catch, limit payload size, 
  use a reviver to block prototype pollution, and validate the parsed object against a strict schema before using it.”
##########################################
Below are real interview trick questions on JSON parsing that JS interviewers love to ask. I’ll show the question, expected answer, and why it works.

1️⃣ Is this valid JSON?
{
  name: "Pavan",
  age: 40
}

✅ Answer

❌ Invalid JSON

Why?

Keys must be in double quotes

Values like strings must be in double quotes

✔️ Valid JSON:

{
  "name": "Pavan",
  "age": 40
}

2️⃣ What is the output?
JSON.parse('{"age": undefined}')

✅ Answer

💥 Throws SyntaxError

Why?

JSON does not support undefined

Only: string, number, boolean, null, array, object

3️⃣ What happens here?
JSON.stringify({
  name: "Pavan",
  age: undefined
});

✅ Answer
{"name":"Pavan"}

Why?

undefined properties are silently removed

4️⃣ Functions in JSON
JSON.stringify({
  greet() {
    console.log("Hello");
  }
});

✅ Answer
{}

Why?

Functions are not serializable

Dropped without error

5️⃣ Date Trick Question
const obj = { createdAt: new Date() };
const json = JSON.stringify(obj);
const parsed = JSON.parse(json);

console.log(typeof parsed.createdAt);

✅ Answer
"string"

Why?

Dates become ISO strings

JSON has no Date type

6️⃣ Circular Reference (Classic!)
const obj = {};
obj.self = obj;

JSON.stringify(obj);

✅ Answer

💥 TypeError: Converting circular structure to JSON

Why?

JSON must be a tree

No cyclic references allowed

7️⃣ NaN and Infinity
JSON.stringify({
  a: NaN,
  b: Infinity,
  c: -Infinity
});

✅ Answer
{"a":null,"b":null,"c":null}

Why?

JSON has no representation for these numbers

They become null

8️⃣ Array with undefined
JSON.stringify([1, undefined, 3]);

✅ Answer
[1,null,3]

Why?

In arrays → undefined becomes null

In objects → key is removed

9️⃣ Order of Keys
const obj = { b: 2, a: 1 };
JSON.stringify(obj);

✅ Answer
{"b":2,"a":1}

Why?

JSON preserves insertion order

Interviewers check if you know this is not sorted

🔟 Custom Serialization (toJSON trap)
const obj = {
  name: "Pavan",
  toJSON() {
    return { name: "Intercepted" };
  }
};

JSON.stringify(obj);

✅ Answer
{"name":"Intercepted"}

Why?

toJSON() overrides default serialization

1️⃣1️⃣ Reviver Function (Advanced)
JSON.parse(
  '{"age":40}',
  (key, value) => typeof value === "number" ? value * 2 : value
);

✅ Answer
{ age: 80 }

Why?

reviver runs bottom-up

Used to restore Dates, Maps, etc.

1️⃣2️⃣ Trailing Comma Trap
JSON.parse('{"a":1,}');

✅ Answer

💥 SyntaxError

Why?

JSON does not allow trailing commas

🔑 Interview Summary Cheat Line

JSON is strict, silent, and lossy
It throws on syntax, drops unsupported values, and converts types.

