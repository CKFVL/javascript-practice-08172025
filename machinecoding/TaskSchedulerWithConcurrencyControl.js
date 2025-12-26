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
      async function __taskRunner(){ // nested regular function lose this and undefined in strict mode
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
          runNextTask();
        }
      }
      
      if(this.runningTasks <this.allowedConcurrentTasks){
        // nested regular function lose this and undefined in strict mode, so bind this
        // otherwise another approach is to use arrow function (cleaner and preferred)
       __taskRunner=__taskRunner.bind(this) 
      }else{
        this.__waitingQueue.push(__taskRunner.bind(this))
      }
    })
  }

  runNextTask(){
    if(this.runningTasks<this.allowedConcurrentTasks && this.__waitingQueue.length > 0){
      const nextTask=this.__waitingQueue.shift();
      nextTask();
    }
  }
}

const taskScheduler=new TaskScheduler(2)

taskScheduler.addTask(()=>new Promise((resolve)=>{
  resolve('Task 1')
}))

taskScheduler.addTask(()=>new Promise((resolve)=>{
  resolve('Task 2')
}))
