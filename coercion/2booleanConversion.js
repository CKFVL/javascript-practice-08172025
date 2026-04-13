to boolean (truthy/falsy)
  false, 0, -0, null, undefined, '', NaN

equality rules:
  with ===, strict comparison happens

  but with ==, type coercion happens
  i.e., boolean value is converted to number

     true == 1 // true
     false == 0 // true