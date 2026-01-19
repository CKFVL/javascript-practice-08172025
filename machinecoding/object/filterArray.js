const obj=[
  "pavan",
  "guru",
  "kumar",
  "bhogala"
]

const sent="Hello guru pavan bhogala! how are you"

let filtered=obj.filter(e=>sent.includes(e))
console.log(filtered)