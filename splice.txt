https://chatgpt.com/g/g-p-6932cd86cb2481918db0c75be634dfea-javascript/c/6932cec8-d2d8-8323-8257-d6580ab9307c
splice() in JavaScript — Examples

splice(start, deleteCount, item1, item2, …)
Used to add, remove, or replace elements in an array.
👉 It modifies the original array.

1️⃣ Remove elements using splice()
Example: Remove 2 elements starting from index 1
let arr = [10, 20, 30, 40, 50];
arr.splice(1, 2); 
console.log(arr);


Output:

[10, 40, 50]


Removed elements: 20, 30

2️⃣ Add elements using splice()
Example: Insert elements without deleting
let arr = [1, 2, 5, 6];
arr.splice(2, 0, 3, 4);   // deleteCount = 0 → only add
console.log(arr);


Output:

[1, 2, 3, 4, 5, 6]

3️⃣ Replace elements
Example: Replace 2 elements with new values
let arr = ["a", "b", "x", "y", "e"];
arr.splice(2, 2, "c", "d");
console.log(arr);


Output:

["a", "b", "c", "d", "e"]

4️⃣ Remove everything from index to end
let arr = [1, 2, 3, 4, 5];
arr.splice(3);   // delete all from index 3
console.log(arr);


Output:

[1, 2, 3]

5️⃣ Using splice() to return removed items
let arr = [100, 200, 300, 400];
let removed = arr.splice(1, 2);

console.log(removed);


Output:

[200, 300]

6️⃣ Insert at the end of an array
let arr = ["a", "b"];
arr.splice(arr.length, 0, "c", "d");
console.log(arr);


Output:

["a", "b", "c", "d"]

7️⃣ Using negative index
let arr = [10, 20, 30, 40];
arr.splice(-1, 1);  // -1 = last element
console.log(arr);


Output:

[10, 20, 30]

8️⃣ Delete everything
let arr = [1, 2, 3];
arr.splice(0);  
console.log(arr);


Output:

[]
