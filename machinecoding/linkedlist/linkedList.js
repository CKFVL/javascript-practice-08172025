/*
A Linked List is a linear data structure where each element (called a node) stores:
    data (value)
    reference (next) to the next node
Unlike arrays, linked lists do not store elements in contiguous memory.
*/
class Node{
    constructor(val){
        this.data=val;
        this.next=null;
    }
}

class LinkedListImpl{
    constructor(){
        this.head=null;
    }

    append(val){
        const newNode=new Node(val)

        if(!this.head){
            this.head=newNode;
            return;
        }

        let currentNode=this.head
        while(currentNode.next){
            currentNode=currentNode.next;
        }

        currentNode.next=newNode
    }

    prepend(val){
        const newNode=new Node(val)

        newNode.next=this.head
        this.head=newNode
    }

    deleteFirst(){
        if(!this.head) return;
        this.head=this.head.next;
    }

    deleteLast(){
        if(!this.head) return
        let currentNode=this.head
        while(currentNode.next.next){
            currentNode=currentNode.next
        }

        currentNode.next=null;
    }

    contains(cval){
        if(!this.head) return false;

        let currentNode=this.head;

        while(currentNode){
            if(currentNode.data===cval){
                return true
            }

            currentNode=currentNode.next
        }

        return false
    }

    print(){
        if(!this.head) return;
        let currentNode=this.head;
        while(currentNode){
            console.log(currentNode.data);
            currentNode=currentNode.next;
        }
    }

    insertAt(val, insIndex){
        const newNode=new Node(val)
        if(!this.head){
            this.head=newNode;
            return;
        }

        let count=0;
        let currentNode=this.head;
        let previousNode=null;
        while(count<insIndex && currentNode.next){
            previousNode=currentNode;
            currentNode=currentNode.next;
            count++;
        }

        if(count!==insIndex) return;

        previousNode.next=newNode;
        newNode.next=currentNode;
    }
}

const ll=new LinkedListImpl()
ll.append(2)
console.log(ll)

ll.prepend(1)
console.log(ll)

ll.append(3)
ll.append(4)
ll.append(5)
ll.append(6)
console.log(ll)

console.log(ll.contains(5))
console.log(ll.contains(6))
ll.print()
console.log('################')
ll.insertAt(7,3)
ll.print()

