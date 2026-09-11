// divided by 2
//check if array contains prime number
const arr=[2,4,9,15,17, 42, 54, 68, 73]

// prime number is divided by 1 and itself
// every even number is not prime

const checkIfPrime=(num)=>{
        if(num <= 1 || num === 0){
            return false;
        }

        if(num === 2){
            console.log('num is 2')
            return true;
        }

        if(num%2===0) return false;

    for(let i=3; i*i <= num; i+=2){
        if(num%i===0){
            console.log('num%i===0', num%i)
            return false;
        }
    }
    return true;
}

checkIfPrimeUsingSqrt=(num)=>{
    if(num <=1 || num === 0){
        return false;
    }

    if(num === 2){
        return true;
    }

    if(num%2===0){
        return false;
    }
    const sqNum=Math.sqrt(num)
    for(let i=3;i<=sqNum;i+=2){
        if(num%i===0){
            console.log('num%i===0', num%i)
            return false;
        }
    }

    return true;
}


const primeArr=arr.filter(num=>checkIfPrime(num));
console.log(primeArr)

const primeArrSq=arr.filter(num=>checkIfPrimeUsingSqrt(num));
console.log(primeArrSq)
