// ABCDDDDEFGHI
// upper case: 65 - 90
// lower case: 97 - 122
let str='ABCDDDDEFGHI'
let largestSeq='';
let currentSeq='';
for(let i=0;i<str.length;i++){
  if(i===0 || str.charCodeAt(i)===str.charCodeAt(i-1)+1){
    currentSeq+=str[i]
  }else{
    currentSeq=str[i]
  }
  if(currentSeq>largestSeq){
    largestSeq=currentSeq
  }
}
console.log(largestSeq)
