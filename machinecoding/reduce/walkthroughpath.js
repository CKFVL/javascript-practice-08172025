const obj={
  a:{
    b:{
      c: [1,2,3]
    }
  }
}

function getKey(obj, path){
  let newPath;
  // typeof Array
  if(Array.isArray(path)) path=path.join('.');
  newPath=path.replace(/\[(\w+)\]/g, '.$1')
  console.log(newPath)
  
  // let result=obj;
  // for(let key of newPath.split('.')){
  //   if(result[key]=== undefined){
  //     return undefined
  //   }
  //   result=result[key]
  // }
  // console.log(result)
  // return result;
  
  // OR
  let normalizedPath=newPath.split('.').reduce((acc, key)=> acc?.[key] || 'learnexampke', obj)
  console.log('---->', normalizedPath)
  
}

getKey(obj, 'a.b.c')// [1,2,3]
getKey(obj, 'a.b.c.0') // 1
getKey(obj, 'a.b.c[1]') //2
getKey(obj, 'a.b.c[3]') // undefined
getKey(obj, ['a','b','c', '2']) //3
getKey(obj, 'a.c', 'learnexampke')// learnexampke