typeerror
var declarations (hoisted but not their assignments i.e. initialized as undefined so calling undefined → TypeError)
      var myFunc = function() { ... }
      *** hoisted as
      var myFunc; // value = undefined

referenceerror:
let and const declarations (hoisted but uninitialized (TDZ) and Access before declaration → ReferenceError)
        Note: hoisting doesn't work when the function is created using const or let