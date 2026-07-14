JS evaluates + like this:
When evaluating: a + b If a or b are objects, Javascript calls:
    -   valueOf
    -   toString()

Under the hood:
        *** One important nuance: modern JavaScript first uses the object's primitive-conversion mechanism (Symbol.toPrimitive if defined).
            Symbol.toPrimitive
                ↓ if absent
            valueOf()
                ↓ if not primitive
            toString()

convert both operands to primitives 
    -   if operand is an object:
            valueOf() will be called and
        if the reuslt is still an object, then toString() will be called.

        If valueOf() returns a primitive, JavaScript stops there and does not call toString()
        e.g.,
            const obj = {
                valueOf() {
                    console.log("valueOf called");
                    return 10; // primitive
                },
                toString() {
                    console.log("toString called");
                    return "20";
                }
            };
        Flow:
            obj + 5
                ↓
                obj.valueOf() → 10   // primitive, stop
                ↓
                10 + 5
                ↓
                15
        
    *** toString() is called only if valueOf() returns a non-primitive object:

    If valueOf() returns an object:
            const obj = {
                valueOf() {
                    return {};       // non-primitive
                },
                toString() {
                    return "10";     // primitive
                }
            };

console.log(obj == 10); // true

console.log(obj + 5);

    -   after both are primitives:
        -   if either primitive is a string -> string concatenation (everything becomes string)
        -   otherwise -> numeric addition

+ always converts objects to primitives first, while == converts an object to a primitive only when its equality rules require it. (refer ==coercion-rules.js)