composition is a pattern where you combine multiple functions

compose(f,g,h)(x)=f(g(h(x)))

const double = x => x * 2;
const square = x => x * x;

const compose = (f, g) => (x) => f(g(x));

compose(square, double)(3); // square(double(3)) = 36

👉 Purpose:
Build complex logic from small functions

where as currying is function transformation (by splitting arguments) technique and not a composition pattern
*** Each function returns another function until all arguments are provided.
(refer currying_new.js)