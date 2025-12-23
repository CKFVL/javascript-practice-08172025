// group by keys
const obj=[
  {
    key: 'Sample 1',
    data: 'Data1'
  },
  {
    key: 'Sample 2',
    data: 'Data2'
  },
   {
    key: 'Sample 1',
    data: 'Data1'
  },
  {
    key: 'Sample 3',
    data: 'Data3'
  },
  {
    key: 'Sample 4',
    data: 'Data4'
  },
  {
    key: 'Sample 4',
    data: 'Data4'
  },
  {
    key: 'Sample 5',
    data: 'Data5'
  },
   {
    key: 'Sample 3',
    data: 'Data3'
  },
]

// Output:
// let output={
//   "Sample 1":[
//     {
//     key: 'Sample 1',
//     data: 'Data1'
//   },
//   {
//     key: 'Sample 1',
//     data: 'Data1'
//   }
//     ],
//     [{
//     key: 'Sample 2',
//     data: 'Data2'
//   }],
//     [ {
//     key: 'Sample 4',
//     data: 'Data4'
//   },
//   {
//     key: 'Sample 4',
//     data: 'Data4'
//   }],
//   [
//     {
//     key: 'Sample 3',
//     data: 'Data3'
//   },{
//     key: 'Sample 3',
//     data: 'Data3'
//   },
//     ],
//     [
//       {
//     key: 'Sample 5',
//     data: 'Data5'
//   }
//       ]
// }

let output={};

for(item of obj){
  //console.log(item)
  console.log(item.key)
  
  const key=Object.keys(output).find(k => k===item.key)
  console.log('key --->',key)
  if(key!==undefined){
    output[item.key].push(item)
  }else{
    output[item.key]=[item]
  }
}
console.log(output)
###############
use reduce: 