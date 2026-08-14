https://www.youtube.com/watch?v=Th3rZjfKKhI

// map polyfill
Array.prototype.myMap=function(callback){
    this.temp=[];
    for(let i=0;i<this.length;i++){
        this.temp.push(callback(this[i], i, this))
    }

    return this.temp;
}

const arr=[1,2,3,4,5];
const mularr=arr.myMap((num, i, arr)=>{
    return num *3;
})

console.log(mularr)

