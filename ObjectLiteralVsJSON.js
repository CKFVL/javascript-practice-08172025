Understanding summary:
  JSON properties are double-quoted
  JSON allows only string, boolean, number, array, object, null
  drops property with undefined value
  functions are not serializable
  Dates become ISO strings
  arrays with undefined becomes null
  NaN, infinity and -infinity will be treated as null
  custom serializtion: toJSON() overrides default serialization

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

##########################################
How to safely parse untrusted JSON?

