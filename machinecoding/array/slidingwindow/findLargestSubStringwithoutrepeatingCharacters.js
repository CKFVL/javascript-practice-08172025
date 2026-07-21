https://chatgpt.com/g/g-p-6a1ad6ea4ff88191a04d4bbeac5fef48-javascript-problems/c/6a5da889-8b3c-83e8-ae45-c113a54954e8
Keep a window of unique characters.
*** If a duplicate appears, move the left pointer until the duplicate is removed. ***
Note:
    right only moves forward (0 → n-1).
    left only moves forward (never decreases).
    
function longestSubstring(str) {
    const set = new Set();

    let left = 0;
    let max = 0;

    for (let right = 0; right < str.length; right++) {

        while (set.has(str[right])) {
            set.delete(str[left]);
            left++;
        }

        set.add(str[right]);

        max = Math.max(max, right - left + 1);
    }

    return max;
}

console.log(longestSubstring("abcabcbb")); // 3
console.log(longestSubstring("pwwkew"));   // 3
console.log(longestSubstring("dvdf"));     // 3
console.log(longestSubstring("abba"));     // 2