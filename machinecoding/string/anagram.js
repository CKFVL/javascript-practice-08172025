// anagram: An anagram string is a word 
// or phrase formed by rearranging the letters of another word or phrase, using all original characters exactly once
let str1='listen'
let str2='silent'

let strarr1=str1.split("").map(c => c.charCodeAt(0))
let strarr2=str2.split("").map(c=>c.charCodeAt(0))

console.log(strarr1)
console.log(strarr2)

strarr1.sort((a,b)=>a-b)
console.log(strarr1)

strarr2.sort((a,b)=>a-b)
console.log(strarr2)

for(i=0;i<strarr1.length;i++){
    if(strarr1[i]!==strarr2[i]){
        console.log('not anagram')
        break
    }
}

// or
console.log(strarr1.join()===strarr2.join())