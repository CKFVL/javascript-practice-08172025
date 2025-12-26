// user requests tasks
// create a task runner and run it
  // - only if current running tasks < allowedConcurrentTasks
  // - if current running tasks >= allowedConcurrentTasks, add task runner to the queue
// when the current task is completed then pick the task runner from queue and run it.
class TaskScheduler{
  constructor(concurrentNumberOfTasks){
    this.allowedConcurrentTasks=concurrentNumberOfTasks
    this.runningTasks=0;
    this.__waitingQueue=[]
  }
  
  addTask(task){
    return new Promise((resolve, reject)=>{
      // nested regular function loose `this`` and undefined in strict mode, so bind `this`
      // otherwise another approach is to use arrow function (cleaner and preferred)
      async function __taskRunner(){
        this.runningTasks+=1;
        try{
        const result=await task()
        console.log(`Result`, result)
        resolve(result)
        }catch(err){
          console.log(`task failed`, err)
          reject(err)
        }finally{
          this.runningTasks-=1
          this.runNextTask();
        }
      }
      
      if(this.runningTasks <this.allowedConcurrentTasks){
        // nested regular function loose `this`` and undefined in strict mode, so bind `this` or use call
        // otherwise another approach is to use arrow function (cleaner and preferred)
        //console.log('running task', task)
       __taskRunner.call(this) 
      }else{
        this.__waitingQueue.push(__taskRunner.bind(this))
      }
    })
  }

  runNextTask(){
    if(this.runningTasks<this.allowedConcurrentTasks && this.__waitingQueue.length > 0){
      console.log('picking task from queue')
      const nextTask=this.__waitingQueue.shift();
      nextTask();
    }
  }
}

(async function main() {
  const taskScheduler = new TaskScheduler(2);

  await Promise.all([
    taskScheduler.addTask(
      () => new Promise(res => setTimeout(() => res("Task 1"), 1000))
    ),
    taskScheduler.addTask(
      () => new Promise(res => setTimeout(() => res("Task 2"), 2000))
    ),
    taskScheduler.addTask(
      () => new Promise(res => setTimeout(() => res("Task 3"), 1000))
    ),
    taskScheduler.addTask(
      () => new Promise(res => setTimeout(() => res("Task 4"), 3000))
    ),
    taskScheduler.addTask(
      () => new Promise(res => setTimeout(() => res("Task 5"), 1000))
    )
  ]);

  console.log("All tasks completed");
})();
