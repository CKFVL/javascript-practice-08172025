const excludes=[ {k:'color', v: 'silver'}, {k:'type', v: 'tv'} ]

let items=[ {color: 'red', type: 'tv', age: 18}, 
{color: 'silver', type: 'phone', age: 28}, 
{color: 'bluw', type: 'book', age: 138}, ]

function excludeItems(items, excludes){
  const excludeMap=new Map();
  
  excludes.forEach(({k,v})=>{
    if(!excludeMap.has(k)){
      excludeMap.set(k,v)
      return
    }
    
    excludeMap.set(k,v);
    return
  })
  

  
  console.log(excludeMap)
  
  items=items.filter(item => {
    for(const [k,v] of excludeMap){
      if(item[k] === v){
        return false
      }
    }
    return true
  })
  
  console.log(items)
  
}

excludeItems(items, excludes)

