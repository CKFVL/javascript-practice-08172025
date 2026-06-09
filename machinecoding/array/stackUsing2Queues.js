class StackUsingQueue{
    constructor(){
        // q1 to store elements in LIFO, last element can be popped using shift()
        this.q1=[];
        this.q2=[];
    }

    push(ele){
      this.q2=[ele]
      // queue behavior: enqueue at rear and dequeue at front and queue won't have unshift() OR pop operation, 
      // So, arrange latest element to be accessible using shift()
      // e.g if elements are inserted in the order of 1,2,3,4 then store elemnets in the order of 4,3,2,1 
      // so the pop operation removes last element first
      while(this.q1.length > 0){
        this.q2.push(this.q1.shift())
      }

      [this.q2, this.q1]=[this.q1, this.q2]
    }

    pop(){
        return this.q1.shift()
    }

}

const sq=new StackUsingQueue()
sq.push(1)
sq.push(2)
sq.push(3)
sq.push(4)

console.log(sq)

sq.pop()
console.log(sq)

sq.pop()
console.log(sq)

sq.pop()
console.log(sq)

sq.pop()
console.log(sq)

sq.pop()
console.log(sq)