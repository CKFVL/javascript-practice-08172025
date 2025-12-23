const excludes=[ {k:'color', v: 'silver'}, {k:'type', v: 'tv'} ]

let items=[ {color: 'red', type: 'tv', age: 18}, 
{color: 'silver', type: 'phone', age: 28}, 
{color: 'bluw', type: 'book', age: 138}, ]

approach 1:
function excludeItems(items, excludes) {
  excludes.forEach(pair => {
    items = items.filter(item => item[pair.k] !== pair.v);
  });
  return items;
}

####################
approach 2:
function excludeItems(items, excludes) {
  return items.filter(item =>
    excludes.every(({ k, v }) => item[k] !== v)
  );
}
####################
approach 3:
function excludeItems(items, excludes){
  const excludeMap=new Map();

  // Runs once per exclude rule → m
  excludes.forEach(({k,v})=>{
    if(!excludeMap.has(k)){
      excludeMap.set(k,v)
      return
    }
    
    excludeMap.set(k,v);
    return
  })
  

  
  console.log(excludeMap)

  // filter runs n times
  // Inner for...of iterates over excludeMap → m
  // O(n × m)
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

// ✅ Total Time Complexity
// O(m) + O(n × m)  ⇒  O(n × m)
//(The smaller O(m) is dominated by O(n × m))

excludeItems(items, excludes)
####################
approach 4:

