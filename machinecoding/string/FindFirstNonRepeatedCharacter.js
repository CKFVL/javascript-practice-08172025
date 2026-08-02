// find first non-repeated character
// ssiiwisse

const str='ssiiwisse';
const strarr=str.split('');
const countmap=new Map([])
for(const c of strarr){
  if(countmap.has(c)){
    countmap.set(c, countmap.get(c)+1)
  }else{
    countmap.set(c,1)
  }
}

let secNonRepeatedKey=null;
let firstNonRepeatedKey=null;
for(const [key,value] of countmap){
  console.log('key: ', key, 'value: ', value);
  if(value===1){
    if(firstNonRepeatedKey === null){
      firstNonRepeatedKey=key;
      continue;
    }else{
      secNonRepeatedKey=key;
      break;
    }
  }
  
}

console.log('first non-repeated: ', firstNonRepeatedKey);
console.log('second non-repeated: ', secNonRepeatedKey);