// A single shared runner
// A queue of pending tasks
// Track currently running tasks
// When a task finishes → start next from queue

// What this gives you
// Max 2 concurrent tasks
// Remaining tasks are queued
// As soon as one finishes → next starts automatically

// Think of it like
// Incoming tasks → Queue → Workers (max N running)
//                           ↓
//                    Task completes
//                           ↓
//                    Pick next from queue

let task = (taskId, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${taskId} completed`), delay)
  })
}

function createTaskRunner(maxAllowedTasks){
  let currentRunningTasks = 0
  let taskQueue = []
  
  function runNext(){
    while(currentRunningTasks < maxAllowedTasks && taskQueue.length > 0){
      currentRunningTasks++
      let {fn, args} = taskQueue.shift()

      console.log('running task', args)

      fn(...args)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          currentRunningTasks--
          runNext()
        })
    }
  }
  
  return function(newTask, ...args){
    taskQueue.push({fn: newTask, args})
    
    if(currentRunningTasks < maxAllowedTasks){
      runNext()
    } else {
      console.log('task runner is busy')
    }
  }
}

let ctr = createTaskRunner(2)

for(let i = 0; i < 10; i++){
  ctr(task, i, 1000)
}