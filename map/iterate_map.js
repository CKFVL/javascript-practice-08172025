Summary:
-------
    -   for...of → Best for most cases; it's concise and supports break/continue.
    -   forEach() → Good for applying a callback to every entry, but you cannot use break or continue.
    -   keys() / values() → Use when you only need one part of the map.

| Method                            | Iterates                                  |
| --------------------------------- | ----------------------------------------- |
| `for (const [k, v] of map)`       | Keys and values (recommended)             |
| `map.entries()`                   | Keys and values                           |
| `map.keys()`                      | Keys only                                 |
| `map.values()`                    | Values only                               |
| `map.forEach((value, key) => {})` | Keys and values                           |
| `[...map]`                        | Converts to array of `[key, value]` pairs |
######################################################################################
There are several ways to iterate over a Map in JavaScript.

for...of
    const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ]);

    for (const [key, value] of map) {
        console.log(key, value);
    }

map.entries(): entries() is the default iterator, so it's equivalent to for...of map.
    for (const [key, value] of map.entries()) {
        console.log(key, value);
    }

Iterate only keys:
    for (const key of map.keys()) {
        console.log(key);
    }

Iterate only values:
    for (const value of map.values()) {
        console.log(value);
    }

forEach():
    map.forEach((value, key) => {
        console.log(key, value);
    });
Note: The callback parameters are (value, key), not (key, value).

Convert to an array:
    console.log([...map]);
    Output:
        [
            ["a", 1],
            ["b", 2],
            ["c", 3]
        ]