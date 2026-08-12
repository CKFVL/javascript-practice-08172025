Summary:
-----------
    Array.from can be used to

1. convert array - like or iterable objects to arrays
e.g.string, set, map

2. Using the mapping function (2nd argument)
Array.from(source, mapFn)

3. create arrays of given length
e.g.Array.from({ length }, (_, i) => i)

https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/696e1d84-b28c-8329-b3b9-af8b3421c404

Array.from Vs[...]
Array.from("abc"); // ["a", "b", "c"]
[..."abc"];       // ["a", "b", "c"]
  Why use Array.from ?
    Supports mapping inline
    Works with array - like objects(not just iterables)

########
Used to create an array from an iterable or array - like object.
    String:
const str = "hello";
const arr = Array.from(str);
console.log(arr);
// ['h', 'e', 'l', 'l', 'o']
Set:
const set = new Set([10, 20, 30]);
const arr = Array.from(set);
console.log(arr); // [10, 20, 30]
    From an object with length:
const obj = {
    0: 'a',
    1: 'b',
    length: 2
};

const arr = Array.from(obj);
console.log(arr); // ['a', 'b']

with mapping function:
    const arrFrom = Array.from({ length: 5 }, (_, index) => index);
console.log(arrFrom)

const arrFrom1 = Array.from({ length: 5 }, (_, index) => index);
console.log(arrFrom1)

const arrfromobj = Array.from({ length: 3 }, (_, index) => ({}))
console.log(arrfromobj)

for independent objects:
    const arr = Array.from({ length: 3 }, (_, index) => ({}));
arr[0].name = "Pavan";
console.log(arr);
        // Each object is a different reference.
        // [{name: 'Pavan'}, {}, {}]
########
// map creates a new array
const tarr = new Array(5).fill(0).map((_, i) => '')
console.log(tarr)

const ff = Array.from({ length: 5 }).map((_, i) => '')
console.log(ff)

const dd = Array.from({ length: 5 }, () => '')
console.log(dd)

const twodarr = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 9))

console.log(twodarr)

const rr = Array.from({ length: 4 }).map((_, i) => Array.from({ length: 3 }, () => '10'))
console.log(rr)

const ss = Array.from({ length: 5 }).map((_, i) => Array.from({ length: 4 }).map((_, j) => '11'))
console.log(ss)