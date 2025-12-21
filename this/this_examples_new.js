Q1. What will be printed?
const user = {
  name: "Pavan",
  greet: () => {
    console.log(this.name);
  },
};

user.greet();

🧠 Answer:
undefined

✔ Explanation:

Arrow function does not bind this.
So inside greet, this is global, not user.

this.name → undefined.

🔥 Q2. What will this code log?
const user = {
  name: "Pavan",
  show() {
    return () => console.log(this.name);
  },
};

user.show()();  

🧠 Answer:
Pavan

✔ Explanation:

show() is a normal function, so inside it this = user.

It returns an arrow function, which inherits this from show().

So arrow function uses this = user.

🔥 Q3. What is the output?
function Person(name) {
  this.name = name;

  this.say = () => {
    console.log(this.name);
  };
}

const p = new Person("Pavan");

const say = p.say;
say();

🧠 Answer:
Pavan

✔ Explanation:

Arrow function say captures this lexically from Person.
Even when detached and stored in variable say,
it still remembers the original this = instance of Person.

🔥 Q4. What happens here?
const obj = {
  value: 10,
  method: () => {
    console.log(this.value);
  },
};

const fn = obj.method;
fn();

🧠 Answer:
undefined

✔ Explanation:

Arrow function never binds this from the object,
so both calls use global this.

🔥 Q5. Does bind() work on arrow functions?
const say = () => console.log(this);

const obj = { msg: "Hello" };

say.bind(obj)();

🧠 Answer:

It prints the original this (global), not obj.

✔ Explanation:

bind(), call(), apply() cannot change this of arrow functions.

🔥 Q6. What does this print?
let length = 10;

const object = {
  length: 5,
  log: () => {
    console.log(this.length);
  },
};

object.log();

🧠 Answer:
10

✔ Explanation:

Global this.length = 10 (in browser).
Arrow captures global this.

🔥 Q7. Output? (super tricky)
let x = 100;

const obj = {
  x: 200,
  arrow: () => {
    console.log(this.x);
  },
  regular() {
    console.log(this.x);
  }
};

obj.arrow();
obj.regular();

🧠 Answer:
100
200

✔ Explanation:

arrow() uses global this, so x = 100

regular() uses object this, so x = 200

🔥 Q8. Arrow inside regular vs regular inside arrow
const obj = {
  val: 10,
  a: function () {
    return () => console.log(this.val);
  },
  b: () => {
    return function () {
      console.log(this.val);
    };
  }
};

obj.a()();  // ?
obj.b()();  // ?

🧠 Answer:
10
undefined

✔ Why?

a() is normal → this = obj → arrow inherits → prints 10

b() is arrow → this = global → returned normal function uses global → undefined

🔥 Q9. Arrow function as method inside class
class Test {
  val = 5;

  a = () => console.log(this.val);

  b() {
    console.log(this.val);
  }
}

const t = new Test();
const fn1 = t.a;
const fn2 = t.b;

fn1(); 
fn2();

🧠 Answer:
5
undefined

✔ Explanation:

a is arrow → always keeps this = instance

b is normal → detached call → this = undefined (strict mode)

🔥 Q10. Arrow functions and setTimeout
const obj = {
  count: 0,
  inc() {
    setTimeout(() => {
      console.log(++this.count);
    }, 0);
  }
};

obj.inc();

🧠 Answer:
1

✔ Explanation:

Arrow function inherits this from inc(),
so it updates obj.count.
