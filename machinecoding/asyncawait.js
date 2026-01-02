https://chatgpt.com/g/g-p-6949600657d88191bbc0c180fd623afb/c/6957ead5-621c-8324-a709-2e6cd3825df0
console.log("A")

async function test(){
  console.log("B")
  await Promise.resolve()
  console.log("C")
}

test().then((e)=>console.log("test"))
console.log("D")