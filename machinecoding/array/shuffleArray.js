const shuffledArray=(gridSize)=>{
  let memoryGrid=Array.from({length:gridSize*2}, (_,i)=>i+1);
  memoryGrid=[...memoryGrid, ...Array.from({length:gridSize*2}, (_,i)=>i+1)]

  const newArr=[...memoryGrid];
  for(let i=newArr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [newArr[j], newArr[i]]=[newArr[i], newArr[j]]
    //[newArr[j], newArr[i]] = [newArr[i], newArr[j]];
  }

  return newArr
}

console.log(shuffledArray(4))