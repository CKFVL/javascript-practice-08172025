// count vowels in a string
function countVowels(){
  const vs='aeiouuoijjjjjqqq';

  const vowelSet=new Set(['a','e','i','o','u']);
  // const varr=vs.split('').filter(e=>
  // {
  // return vowelSet.has(e)
  // });
  
  const varr=[...vs].filter(e=>
  {
  return vowelSet.has(e)
  });
  console.log(varr.length)
}

countVowels();