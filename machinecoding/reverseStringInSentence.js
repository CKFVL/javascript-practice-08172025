// reverse each word in a sentence
function reverseEachWordInSentence(sent){
  const str="Welcome to this Javascript Guide!"
  const splitArr=str.split(" ")
  console.log(splitArr)
  
  const rs=splitArr.map(w=> reverseString(w))
  //console.log(rs)
  const revfinal=rs.join(" ")
  console.log(revfinal)
  
}

function reverseString(word){
  const revArr=[]
  
  for(let i=word.length-1;i>=0;i--){
    revArr.push((word[i]))
  }
  
  return revArr.join("")
}

//reverseString('sdfsf')
//reverseEachWordInSentence()

// cleaner version
const str="Welcome to this Javascript Guide!"
const revsent=str.split(" ").map(w=>[...w].reverse().join("")).join(" ")
console.log(revsent)