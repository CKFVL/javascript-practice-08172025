let reversedNum=0

// 457
function reverseNumber(num){
    let rev=0;
    while(num>0){
      var rem=num%10
      rev=rev*10+rem
      //console.log(Math.floor(num/10))
      num=Math.floor(num/10)
    }
    
    return rev
}

const revd=reverseNumber(457)
console.log(revd)

const reved=reverseNumber(7500)
console.log(reved)

// below approach preserves zeros
const num=7500 
console.log(num.toString())
console.log(num.toString().split("").reverse().join(""))
