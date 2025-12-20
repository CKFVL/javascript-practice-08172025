in js, immutability can be achieved using slice(array), spread operator

const houses = ['Aryn', 'Frey', 'Greyjoy', 'Stark', 'Lannister', 'Tyrell']
const updatedHorses = [...houses, 'Targaryen'];//creates new array with copy of elements in houses and new element, Targaryen
const inDebt = [...houses.slice(0, 4), ...houses.slice(5)];
const updHouses = [...houses.slice(0, 1), 'Frey of crossing', ...houses.slice(2)];//adds element in updHouses at index 1

//spread does shallow copy, it means it copies one level of data and not nested structured data.
//e.g., 
const state = {
    name: 'pavan',
    occupation: 'develoepr',
    skills: []
}

//const newState={...state, occupation:'programmer'} 
//newState.skills.push('js') // occupation value in newState will be programmer, but skills will be updated both in state and newState objects
//so, to achieve immutability, do like below.
//newState.skills=[...newState.skills,'js'] // will add js to skills in newState only

// OR change occupation value and add skill to skills at sametime
const newState = { ...state, occupation: 'programmer', skills: [...state.skills, 'js'] }

console.log(state)
console.log(newState)
