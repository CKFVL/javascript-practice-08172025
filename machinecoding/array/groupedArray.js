array = [
  { "id": "1" },
  { "id": "1" },
  { "id": "2" }
]
// output:
// {
//   "1": [{"id":"1"}, {"id":"1"}],
//   "2": [{"id":"2"}]
// }
let newObj = {}
array.forEach(e => {
  const kid = e.id
  if (newObj[kid] !== undefined) {
    newObj[kid].push(e)
  } else {
    console.log('#########')
    newObj[kid] = [e]
  }
})

console.log(newObj)
console.log('@@@@@@@@@@@@@')
// reduce
let redarr = array.reduce((acc, obj, index, array) => {
  let kid = obj.id
  console.log(kid)

  if (!acc[kid]) {
    acc[kid] = [];
  }
  acc[kid].push(obj)
  return acc

}, {})
console.log(redarr)