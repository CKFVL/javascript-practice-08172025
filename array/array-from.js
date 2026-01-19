Array.from can be used to 

1. convert array-like or iterable objects to arrays
    e.g. string, set, map

2. Using the mapping function (2nd argument)
   Array.from(source, mapFn)

3. create arrays of given length
    e.g. Array.from({length}, (_, i)=>i)

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/696e1d84-b28c-8329-b3b9-af8b3421c404

Array.from vs [...]
  Array.from("abc"); // ["a", "b", "c"]
  [..."abc"];       // ["a", "b", "c"]
  Why use Array.from?
    Supports mapping inline
    Works with array-like objects (not just iterables)

