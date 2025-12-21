Core rule to remember

Variables (var, let, const) do not become object properties.
Only assignments to `this` do.

Example:
function personRegular(name) {
  this.name = name;

  var say = () => { // behaves same way with let, const
    console.log(this.name);
  };
}

const pr=personRegular('kumar')
pr.say()
