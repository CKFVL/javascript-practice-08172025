Strict equality (===) : No coercion happens
  5 === '5' // false

Loose equality (==): types are different then coercion happens
When you use ==, JavaScript follows type coercion rules.

  Important rules:
  1. String Vs Number
    '5' == 5 // true

  2. Boolean: boolean is converted to number first
     true == 1 // true
     false == 0 // true

  3. null & undefined
     null === undefined // false as JS doesn't apply coercion rule for ===

     null == undefined
      JavaScript does NOT go through usual type coercion (like converting to number/string).
      Instead, the spec has a direct rule:
      If one value is null and the other is undefined, return true.
      ✔️ That’s it. No conversion.
     🧠 Step-by-step (internally)
        The equality algorithm (==) does something like:
        Are types same? → ❌ (null vs undefined)
        Special check:
            If x == null and y == undefined → ✅ return true

      *** null and undefined are in a private club

      why null == 0 is false?
      What actually happens step-by-step
      When using ==, JavaScript follows a defined algorithm.
      Step 1: Types are different
        null → type: null
        0 → type: number
        So coercion rules apply.

      Step 2: Special rule for null
        There is a very important exception:
        null only equals undefined — nothing else.
        So before doing any numeric conversion, JS checks:
          Is one null and the other undefined? → ❌ No
          Then → ❌ return false
        👉 It does NOT convert null to 0 here

      ✅ Normal coercion happens:
        '0' == 0      // true  (string → number)
        false == 0    // true  (boolean → number)

        ❌ But NOT for null:
        null == 0     // false
        null == false // false
        null == ''    // false


        undefined == 0     // false
        undefined == false // false
--------
  4. Object comparison
     [] == '' //true
     [] == 0 //true
     [1] == 1 // true i.e. Array overrides valueOf (returns array) and toString (outputs comma delimited value)
     Note: objects, arrays and functions are converted to primitive first and then use valueOf and toString()
     
     Objects -> converted using:
      1. valueOf()
      2. toString()
        When does toString() get used then?
        Only during object → primitive conversion, which happens in cases like:
          == comparison
          + operator
          string concatenation

        Example:
          [] == 0
          Now JS needs to compare:
          object vs number → must convert object → primitive
          👉 THEN it does:
          [].valueOf() → still object (array)
          [].toString() → ""

The + operator special case
  refer +coercion.js file

##################
  Object -> primitive (arrays are objects, so JS tries to convert [] to primitive)
  Note: objects, arrays and functions are converted to primitive first and then use valueOf and toString()
    valueOf()
    toString()

  e.g., [] === false // true
  Step 1: Boolean -> Number
    false -> 0
    now comparison becomes:
    [] === 0

  Step 2: Object -> primitive
  Arrays are objects, so JS tries to convert [] to primitives
    It does this using: 
      valueOf()
      toString()

  Step 3: [].toString()
  Array.toString() joins elements with commas
  empty array -> nothing to join -> empty string

  Step 4: String -> Number
  "" -> 0

  Final comparison:
    0 === 0 -> true

Similar examples:
  [] == ''      // true
  [] == 0       // true
  [1] == 1      // true

######################################################
Weird but Important Cases
[] == []          // false  (different references)


[] == ![]         // true 😵
Why ![] does NOT call [].toString()
When JS evaluates: ![], it does NOT try to convert the array to a string or number.
Instead, it uses ToBoolean conversion.
Rule: Boolean conversion is simple
For truthiness, JavaScript has a fixed rule:
  Objects are ALWAYS truthy
  Boolean([]) // true
  Boolean({}) // true
👉 No toString(), no valueOf() — nothing is called.
  So Step 1 is:
    ![]
    ↓
    !true
    ↓
    false

When does toString() get used then?
Only during object → primitive conversion, which happens in cases like:

== comparison
+ operator
string concatenation

Example:
[] == 0

Now JS needs to compare:
object vs number → must convert object → primitive
👉 THEN it does:

[].valueOf() → still object
[].toString() → ""

These weird cases happen only with ==.
If you use strict equality:
[] === ![] // false
No coercion → no surprises.