In JavaScript, `this` is decided at call time, not where the function is defined.

Is the function an arrow function?
  │
  ├── YES → Inherit `this` from surrounding scope
  │             ▲
  │             │
  │    Closest enclosing scope:
  │      ├─ Regular function? → Use its `this` (refer Q3 in this_examples_new.js, Even when detached and stored in variable say, it still remembers the original this = instance of Person.)
  │      ├─ Another arrow? → Keep climbing outward
  │      └─ Global/module? → Use global/module `this`
  │
  └── NO (Regular function)
        │
        ├── Called with `new`? → `this` = New object
        │
        ├── Called with .call/.apply/.bind?
        │        → `this` = First argument passed
        │
        ├── Called as obj.method()? → `this` = Object left of dot
        │
        └── None of the above?
                 → `this` = Global object (non-strict) or undefined (strict)
###################################################################
function () { } → creates new this
arrow function, () => { } → does NOT create new this
{ } object literal → does NOT create new this
###################################################################
rule of thumb:
-------------
  // this : object that is executing the current function
    // if a function is a method in an Object ({}), this refers to object itself
    // if a function is regular function defined in browser or nodejs i.e., not inside an object, this refers to global object
        //refer: thisInDifferentEnvironment.js
    // if a function is constructor function and is created using new operator, then this refers to arguments to it in new {} object
###################################################################
bind(), call(), apply() cannot change this of arrow functions.
Refer Q5 in this_examples_new.js