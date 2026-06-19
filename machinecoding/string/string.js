loop string:
-----------
    for(let i=0;i<structuredClone.length;i++){
        // console.log(str[i])
    }

Modifying strings:
str[3]="b" // can't do this in js
str.replace("s", "b") // replaces first occurence of the character s
str.replaceAll("e","c") // replaces all occurences of character e

concatenate string:
------------------
    str.concat("")
    str.concat(" and share this ")
    
str.trim() // trims leading and trailing spaces

// accessing characters
str.charAt(0)

// searching
console.log(str.indexOf("R"))
str.lastIndexOf("e")
str.startsWith("")
str.endsWidth("")

let str='hellp pavan kumar'
let str='hellpqpavan kumar'
console.log(str[0])
console.log(str.substring(6))
console.log(str.slice(6))
console.log(str.substring(3,-1)) // instead of starting from 3, it gets number of characters provided in startIndex
console.log(str.slice(6,-1)) // starts from 6 and eliminates characters from end provided by endIndex
console.log(str.slice(6,-4))

// object to string
const user={name:'pavan'}
const struser=JSON.stringify(user)
console.log(struser)

const parseobj=JSON.parse(struser)
console.log(parseobj)

// ascii
const str='hello pavan'
console.log(str.charCodeAt(2))
console.log(String.fromCharCode(108))

const str1='apple'
const str2='banana'
const str3='apple'

console.log(str1.localeCompare(str2)) // return 1
console.log(str1.localeCompare(str3)) // returns 0

// includes
const str='subscribe to my channel'
console.log(str.includes('subscribe'))

// split
split

// join

// usage of template string
function test(subscribeStr, channel, person){
    console.log(subscribeStr, channel, person)
}
test `Subscribe to ${channel} run by ${person}`



