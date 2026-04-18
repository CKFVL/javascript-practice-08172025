const sleep=new Promise((resolve)=>setTimeout(resolve, 2000))
console.log(new Date())
console.log('sleeping')
await sleep
console.log(new Date())
console.log('sleep')

| Code                                      | What happens                       |
| ----------------------------------------- | ---------------------------------- |
| `setTimeout(resolve('done'), 2000)`       | ❌ runs immediately                 |
| `setTimeout(resolve, 2000)`               | ✅ works, resolves with `undefined` |
| `setTimeout(() => resolve('done'), 2000)` | ✅ correct, resolves with `'done'`  |
