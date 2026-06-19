// hamming distance: distance between 2 integers is the number of positions at which the correspondong bits are different
const str1 = 1
const str2 = 9

function hammingDistance(str1, str2) {
    let str1bin = str1.toString(2)
    let str2bin = str2.toString(2)

    if (str1bin.length < str2bin.length) {
        while (str1bin.length != str2bin.length) {
            str1bin = '0' + str1bin
        }
    }
    console.log(str1bin)

    if (str2bin.length < str1bin.length) {
        while (str2bin.length != str1bin.length) {
            str2bin = '0' + str2bin
        }
    }
    console.log(str2bin)

    let distance = ''

    for (let i = 0; i < str1bin.length; i++) {
        if (str1bin[i] !== str2bin[i]) {
            distance++
        }
    }

    return distance
}

console.log(hammingDistance(str1, str2))
console.log(hammingDistance(1, 4))
console.log(hammingDistance(2, 9))