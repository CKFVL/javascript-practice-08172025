const team=[
{name: 'Alice', tags: ['dev', 'js']},
{name: 'Bob', tags: ['design', 'js']},
{name: 'Corner', tags: ['dev', 'react']}
]

const tags=team.map(e=>e.tags).flat(1)
console.log(tags)

// OR
const tagsWithFlatMap=team.flatMap(e=>e.tags) // gets only 1 level of object
console.log(tagsWithFlatMap)

// remove duplicates
const tagset=[...new Set(tagsWithFlatMap)]
console.log(tagset)