const shuffledArray=(gridSize)=>{
  let memoryGrid=Array.from({length:gridSize*2}, (_,i)=>i+1);
  memoryGrid=[...memoryGrid, ...Array.from({length:gridSize*2}, (_,i)=>i+1)]

  // Why backward matters (i.e. shuffle from the end)
    // At each step:
    // You fix one element at position i
    // Swap it with a random index 0 → i
    // This guarantees:
    // Every permutation has equal probability (true randomness)
const newArr=[...memoryGrid]
console.log(newArr)
for(let i=newArr.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  
  [newArr[j], newArr[i]]=[newArr[i], newArr[j]]
}

console.log(newArr);

The syntax:
  [a, b] = [b, a] is called array destructuring assignment
shortest way to swap values between variables

Instead of writing:
  let temp = a
  a = b
  b = temp

you can simply do:
  [a, b] = [b, a]

right side [b,a] means it creates a temporary array with swapped values
Left side:
[a, b]

→ destructures (unpacks) that array into variables
So effectively:
a = b
b = a (original value)

Example:
  let a = 1
  let b = 2
  [a, b] = [b, a]
  console.log(a, b) // 2 1

Take values from the right array and assign them positionally to the left variables.