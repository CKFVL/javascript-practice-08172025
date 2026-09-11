const str1 = 'ababcdcdefefg';
const splitstrarr = str1.split('');

const smap = new Map([])
for (let i = 0; i < splitstrarr.length; i++) {
    if (smap.has(splitstrarr[i])) {
        const sc = smap.get(splitstrarr[i])
        smap.set(splitstrarr[i], sc + 1);
    } else {
        smap.set(splitstrarr[i], 1)
    }
}

//console.log(smap)

for (const [k, v] of smap) {
    //console.log(k, v)
    if (v > 1) {
        console.log('dup char', k)
    }
}

const dupcmap = [...smap.entries()].filter(([k, v]) => v > 1).map(([k, v]) => k)
console.log(dupcmap)