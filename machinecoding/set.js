remove last element in a set:
function removeLast(set) {
  const last = [...set].pop();

  set.delete(last);

  return set;
}

const numbers = new Set([1, 2, 3, 4]);

console.log(removeLast(numbers));
