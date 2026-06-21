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

// using object - pendiong
// anagram: An anagram string is a word 
// or phrase formed by rearranging the letters of another word or phrase, using all original characters exactly once
let str1='listen'
let str2='silent'

let obj1={}
let obj2={}
// approach using object
for(let i=0;i<str1.length;i++){
    if(obj1.hasOwnProperty(str1[i])){
        obj1[str1[i]]=obj1[str1[i]]+1
    }else{
        obj1[str1[i]]=1
    }
}

console.log(obj1)

for(let j=0;j<str2.length;j++){
    if(obj2.hasOwnProperty(str2[j])){
        obj2[str2[j]]=obj2[str2[j]]+1
    }else{
        obj2[str2[j]]=1
    }
}
console.log(obj2)

if(Object.keys(obj1).length !== Object.keys(obj2).length){
    console.log('not equal!')
}

for(const key in obj1){
  if(obj1[key]!==obj2[key]){
    console.log('not anagram')
  }
}

console.log('is anagram')