== does not always convert an object to a primitive. It depends on the types being compared like +.

    - strict equality (no coercion happens)
    - loose equality: coercion happens if *** types are different ***
        Exception cases:
        - null == undefined (always true as JS doesn't apply coercion rules)
        - if one of the value is null and other value is not undefined, then coercion doesn't happen, the result will be always false
            Special rule for null
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

    
    - Boolean value is converted to number
    - toString() called when 
        - ==
        - + operator
        - string concatenate operation

Object vs primitive → convert the object
    const obj = {
        valueOf() {
            return 10;
        }
    };

    obj == 10; // true

Because one side is an object and the other is a primitive, JavaScript converts the object:
    obj == 10
        ↓
        obj.valueOf() → 10
        ↓
        10 == 10
        ↓
        true

Object vs object → no primitive conversion
    const a = {};
    const b = {};

    a == b; // false

Both are objects, so JavaScript compares their references:
    a == b
        ↓
        Are they the exact same object?
        ↓
        false

    But:
        const a = {};
        const b = a;
        a == b; // true

        So, "when its equality rules require it" means:

If == is comparing an object with certain primitive values, it converts the object to a primitive. 
*** If both sides are objects, it compares references instead.

 Object -> primitive (arrays are objects, so JS tries to convert [] to primitive)
  Note: objects, arrays and functions are converted to primitive first and then use valueOf and toString()
    valueOf()
    toString()

  e.g., [] == false // true
        Step 1: Boolean -> Number
            false -> 0
            now comparison becomes:
            [] == 0

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
