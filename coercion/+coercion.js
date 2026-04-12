https://www.youtube.com/watch?v=XoGjPdPTAVA&list=PLQpVsaqBj4RIpDQIVowFni58LsK4cM9Qz&index=28

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/69aab159-efa0-8324-8691-42b26fb8c086
In JavaScript, the + operator is special because it works for both numeric addition and string concatenation.
The engine decides which one to use based on type coercion rules.

JS evaluates + like this
  When evaluating:
    a + b
  - convert objects -> primitive 
    If a or b are objects, Javascript calls:
      - valueOf()
      - if not primitive -> toString()
      Example:
        let obj = {
          valueOf() { return 10 }
        }
        console.log(obj + 5) // 15

  - If either operand is string -> concatenate
        "5" + 3   // "53"
        3 + "5"   // "35"
  - otherwise -> numeric addition

Rule: If one operand is string → everything becomes string

Examples That Show the Rule
String wins
    1 + "2" + 3

Evaluation order (left → right):
    1 + "2"   → "12"
    "12" + 3  → "123"

Numbers first, then string
    1 + 2 + "3"
    Steps:
        1 + 2 → 3
        3 + "3" → "33"

Arrays and Objects:
  Arrays convert using toString()
  Arrays in Javascript do have a valueOf() method
  It is inherited from Object.prototype, but Array.prototype overrides it.
  const arr = [1, 2, 3];
  Array.prototype.valueOf() returns the array itself (So it does not convert the array to a primitive.)
    console.log(arr.valueOf()) // [1,2,3]
    - Arrays override toString() → calls join()
    e.g. [1,2] + [3,4]
        Step:
            "1,2" + "3,4"
        Result:
            "1,23,4"

  Interesting advanced trick (since you were experimenting with valueOf earlier):
    You can override valueOf() to control arithmetic behavior:
    const arr = [1,2,3];
    arr.valueOf = () => 10;
    console.log(arr + 5); // 15
  

  For normal/plain objects, 
  For a normal (plain) JavaScript object, the default valueOf() method returns the object itself.
  Plain objects inherit valueOf() from Object.prototype.valueOf.
  The specification behavior is essentially:
    Object.prototype.valueOf = function () {
      return this;
    }
    So it simply returns the same object reference.
    const obj = { name: "pavan", age: 10 };
    obj.valueOf();
    Output: { name: "pavan", age: 10 }
    
  the default toString() comes from Object.prototype.toString()
    Objects
      {} + {}
      In REPL it becomes:
      "[object Object][object Object]"

Special cases:
  Array+Array
  [] + [] --> "" + "" = ""
  Array+object
  [] + {} --> "" = "[object Object]"

  Boolean:
  true + true --> 1+1 = 2

##############################################
var ArrayWrapper=function(nums){
  this.nums=nums
}



// For objects, JavaScript coercion order for object-to-primitive conversion is:
// valueOf()
// toString()
// error (if no primitive)
// Because you overrode valueOf(), JS knows exactly how to treat your object as a number.

// valueOf() tells JavaScript how to convert an object into a primitive value (number)
ArrayWrapper.prototype.valueOf=function(){
  return this.nums.reduce(
    (n,a)=>n+a,0  
  )
}

const obj1=new ArrayWrapper([1,2])
console.log(obj1)
const obj2=new ArrayWrapper([4,5])
console.log(obj2)

// What JavaScript does internally
// When JS sees + with objects:
// Try to convert objects to primitives
// Call valueOf() first
// If that returns a primitive → use it
// So this happens:
// obj1 + obj2
// ↓
// obj1.valueOf() + obj2.valueOf()
// ↓
// 3 + 9
// ↓
// 12
// console.log(obj1+obj2)

ArrayWrapper.prototype.toString=function(){
  return `[${String(this.nums)}]`
}

console.log(String(obj1))
console.log(String(obj2))