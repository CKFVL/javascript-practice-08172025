class PromisePool{
  activeIndex
  
  constructor(maxTasks){
    this.maxTasks=maxTasks
    this.activeIndex=0
  }
  
  // loop - when new tasks are added to tasksArray, then it should submit to pool
  // activeIndex
  // function --> takes in first 
  run(tasksArray){
    
    while(this.activeIndex < tasksArray.length){
      console.log(this.activeIndex)
      let fn=tasksArray[this.activeIndex]
      let resolvedFn=new Promise((resolve, reject)=>{
        fn();
        resolve(this.activeIndex++)
      })
      
      resolvedFn.then(l=>console.log(l))
    }  
  }
  
}

function user(){
  console.log('user found')
}
function payment(){
  console.log('payment done')
}
function address(){
  console.log('address updated')
}
let pp=new PromisePool(1)
pp.run([user, payment, address])