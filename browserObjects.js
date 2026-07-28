navigator.clipboard.writeText(value) - to provide copy option

#############################################################
setTimeout:
Never call the function inside setTimeout
setTimeout(fn, delay)   // ✔
setTimeout(fn(), delay) // ❌
Example in function-methods-call-apply-bind.js