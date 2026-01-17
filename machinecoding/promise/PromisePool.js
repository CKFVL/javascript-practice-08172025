Runs at most n tasks at a time
Starts next task as soon as one finishes
Resolves when all tasks finish

function promisePool(tasks, limit) {
  return new Promise((resolve, reject) => {
    let i = 0
    let active = 0
    let completed = 0

    function next() {
      // all tasks done
      if (completed === tasks.length) {
        resolve()
        return
      }

      // start tasks while under limit
      while (active < limit && i < tasks.length) {
        const task = tasks[i++]
        active++

        task()
          .then(result => {
            console.log(result)
          })
          .catch(reject)
          .finally(() => {
            active--
            completed++
            next()
          })
      }
    }

    next()
  })
}

Task creation:
function newTask(nTask) {
  return new Promise(resolve =>
    setTimeout(() => resolve(`task ${nTask} completed`), 1000)
  )
}
const taskArray = []
for (let i = 0; i < 10; i++) {
  taskArray.push(() => newTask(i))
}

Usage:
promisePool(taskArray, 2).then(() => {
  console.log("All tasks completed")
})