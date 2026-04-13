Weird but Important Cases
[] == []          // false  (different references)


[] == ![]         // true 😵
Why ![] does NOT call [].toString()
![] doesn't call toString() because:
    Boolean conversion (ToBoolean) is primitive and direct, and objects are always truthy by definition

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