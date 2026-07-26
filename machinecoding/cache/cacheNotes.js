why set can't be used for LRUCache implementation?
A Set only stores values, whereas a Map stores key-value pairs. 
An LRU cache needs to retrieve the value associated with a key in O(1) time, so Map is the appropriate choice.

Why Map works
Your cache stores:

"a" => "apple"
"b" => "banana"
"c" => "cat"

A Map lets you do:
map.get("b") // "banana"
in O(1).

What if you use a Set?
A Set can only store:
const set = new Set();

set.add("a");
set.add("b");
set.add("c");

There's no place to store the values.
You cannot do:
set.get("a"); // ❌ doesn't exist

Set only has:
set.add(value)
set.has(value)
set.delete(value)

Could you store objects in a Set?
You might think of doing:

const set = new Set();

set.add({ key: "a", value: "apple" });
set.add({ key: "b", value: "banana" });

Now how do you retrieve "apple" using "a"?
You'd have to search:

for (const item of set) {
    if (item.key === "a") {
        console.log(item.value);
    }
}

This is O(n).
An LRU cache requires O(1) lookup.

Why Map is perfect
A Map gives you all the operations you need:

map.has(key)
map.get(key)
map.set(key, value)
map.delete(key)
and also preserves insertion order.

That's exactly why the common JavaScript LRU implementation uses a Map.
---
If you only needed ordering
If your requirement was only:

    remember insertion order
    unique items
    no associated values

then a Set would work perfectly.

const recent = new Set();

function access(page) {
    if (recent.has(page)) {
        recent.delete(page);
    }

    recent.add(page);
}

access("A");
access("B");
access("A");

console.log([...recent]);
// ["B", "A"]