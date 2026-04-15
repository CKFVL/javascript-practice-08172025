Runs at most n tasks at a time
Starts next task as soon as one finishes
Resolves when all tasks finish

// pool function : paramaters- tasks, maxTasksAtSameTime
// task
// task creator

// task
function task(taskNo){
  return new Promise((resolve)=> setTimeout(()=>resolve(`task ${taskNo} completed`), 100))
}

// task creator
function taskCreator(taskCount){
  let tasks=[]
  for(let i=0;i<taskCount; i++){
    tasks.push(()=>task(i))
  }
  
  return tasks
}

function promisePool(maxTasksAtSameTime, tasks){
// if promise is not used, it behaves like non-blocking that is it's like starting threads and walking away
  // ✅ Tasks will still execute correctly
  // ❌ Caller cannot await completion
  // ❌ No way to get final results
  // ❌ No way to know when pool finishes (except console logs)
  return new Promise((resolve,reject)=>{ 
    let completedTasks=0;
    let activeTasks=0
    let nextTask=0
      
    function runNext(){
      if(completedTasks===tasks.length){
        console.log('all tasks completed')
        resolve()
        return
      }
      
      while(activeTasks < maxTasksAtSameTime && nextTask < tasks.length){
        let fntsk=tasks[nextTask++]
        activeTasks++
        let fntskpromise=fntsk(nextTask)
        fntskpromise.then(result=> console.log(result)).catch(err=> console.log(err)).finally(()=>{
          completedTasks++
          activeTasks--
          runNext()
        })
      }
        
    }
    
    runNext()
    
  })
}

let tc=taskCreator(10)
console.log(tc)
promisePool(2, tc).then(res=>console.log('all tasks completed!'))

