Understanding summary:
JSON:
  JSON properties are double-quoted
  JSON.parse only supports these - string, number, boolean, null, array, object

  JSON is strict, silent, and lossy
  It throws on syntax, drops unsupported values, and converts types.
    drops property with undefined value (while stringify)
    functions are not serializable (Dropped without error)
    Dates become ISO strings (while stringify)
    NaN, infinity and -infinity will be treated as null (while stringify)
    arrays with undefined becomes null (while stringify)
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
https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb-javascript-practice/c/6a604b25-e820-83e8-be4e-266bf3404135

1. Wrap JSON.parse() in try/catch

If the JSON is malformed, JSON.parse() throws an exception.

const json = '{"name":"John",}'; // Invalid JSON

try {
  const obj = JSON.parse(json);
  console.log(obj);
} catch (err) {
  console.log("Invalid JSON:", err.message);
}

Without try/catch:

const obj = JSON.parse(json); // Program crashes

So the first protection is simply preventing your application from crashing.

2. Limit payload size

Someone could send an enormous JSON string.

Imagine this:

const hugeJson = "A".repeat(500 * 1024 * 1024); // 500 MB

or

{
  "data": [
    millions_of_objects...
  ]
}

Parsing huge JSON

consumes a lot of memory
blocks the event loop
may crash your server

So before parsing:

if (jsonString.length > 1024 * 1024) { // 1 MB
    throw new Error("Payload too large");
}

const obj = JSON.parse(jsonString);

Many servers also enforce request-size limits before your code even receives the body.

3. Use a reviver to block prototype pollution

This is the interesting security part.

What is prototype pollution?

Normally objects inherit from Object.prototype.

const obj = {};

console.log(obj.toString);

Suppose an attacker sends

{
  "__proto__": {
    "isAdmin": true
  }
}

or

{
  "constructor": {
    "prototype": {
      "isAdmin": true
    }
  }
}

If your application later merges this object carelessly, it may end up modifying object prototypes.

Example:

const malicious = JSON.parse(json);

Object.assign({}, malicious);

Some libraries in the past were vulnerable to this.

Now suddenly

const user = {};

console.log(user.isAdmin);

could become

true

even though you never set it.

This is called prototype pollution.

Reviver

JSON.parse has a second parameter called a reviver.

Syntax:

JSON.parse(text, reviver);

The reviver runs for every property.

Example:

const json = '{"name":"John","age":30}';

const obj = JSON.parse(json, (key, value) => {
    console.log(key, value);
    return value;
});

Output

name John
age 30
 { name: 'John', age: 30 }

Notice it visits every property.

Now we can reject dangerous keys.

const obj = JSON.parse(jsonString, (key, value) => {
    if (
        key === "__proto__" ||
        key === "constructor" ||
        key === "prototype"
    ) {
        return undefined; // remove property
    }

    return value;
});

If JSON contains

{
    "__proto__": {
        "isAdmin": true
    },
    "name":"John"
}

Result becomes

{
    name: "John"
}

The dangerous property is removed.

4. Validate against a strict schema

Even if JSON is valid, it may still contain unexpected data.

Suppose you expect

{
  "name":"Alice",
  "age":25
}

Someone sends

{
  "name":12345,
  "age":"twenty",
  "admin":true
}

JSON.parse accepts it because it's valid JSON.

So you validate it.

Example:

function validateUser(user) {
    return (
        typeof user.name === "string" &&
        typeof user.age === "number"
    );
}

const user = JSON.parse(json);

if (!validateUser(user)) {
    throw new Error("Invalid data");
}

Libraries like Ajv, Zod, and Joi make schema validation much more powerful.

Example with Zod:

const UserSchema = z.object({
    name: z.string(),
    age: z.number()
});

const user = UserSchema.parse(JSON.parse(json));

Now only properly structured objects are accepted.

Putting everything together
const MAX_SIZE = 1024 * 1024; // 1 MB

function safeParse(jsonString) {
    // 1. Limit size
    if (jsonString.length > MAX_SIZE) {
        throw new Error("Payload too large");
    }

    let obj;

    // 2. Parse safely
    try {
        obj = JSON.parse(jsonString, (key, value) => {
            if (
                key === "__proto__" ||
                key === "constructor" ||
                key === "prototype"
            ) {
                return undefined;
            }

            return value;
        });
    } catch {
        throw new Error("Invalid JSON");
    }

    // 3. Validate schema
    if (
        typeof obj.name !== "string" ||
        typeof obj.age !== "number"
    ) {
        throw new Error("Invalid user object");
    }

    return obj;
}

Usage:

const user = safeParse(request.body);

console.log(user.name);
Visual Flow
Incoming JSON String
        │
        ▼
┌─────────────────────┐
│ Check payload size  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ JSON.parse()        │
│ inside try/catch    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Reviver removes     │
│ __proto__           │
│ constructor         │
│ prototype           │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Validate schema     │
│ name:string         │
│ age:number          │
└──────────┬──────────┘
           │
           ▼
      Safe object
Interview takeaway

If asked, "How do you safely parse untrusted JSON?", a concise answer is:
"I first enforce a maximum payload size to prevent resource exhaustion. 
  Then I wrap JSON.parse() in a try/catch to handle malformed JSON. 
  I use a reviver to reject dangerous keys like __proto__, constructor, and prototype to reduce the risk of prototype pollution. 
  Finally, I validate the parsed object against a strict schema (using a library like Zod, Ajv, or Joi, or custom validation) before using it in my application. 
This ensures the data is both syntactically valid and structurally safe."

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

