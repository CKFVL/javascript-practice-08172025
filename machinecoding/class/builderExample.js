class ComputeAmount{
  constructor(){
    this.total=0
  }

  
  lacs(n){
    this.total=this.total+(n*1000000)
    return this;
  }
  
  thousands(n){
    this.total=this.total+(n*1000)
    return this;
  }
  
  crores(n){
    this.total=this.total+(n*100000000)
    return this
  }
}

const total=new ComputeAmount()
const tam=total.lacs(10).thousands(20)
console.log(tam.total)

console.log(tam.crores(0.5).total)