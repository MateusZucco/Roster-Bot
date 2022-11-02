const axios = require('axios')

const editItem = async (newValue, roster, itemToEdit) => {  
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/item/${itemToEdit.id}`, {newValue}) 
    return result.data[0]
}
const editTitle = async (newTitle, roster) => {  
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/title`, {newTitle}) 
    return result.data[0]
}
const editDescription = async (newDescription, roster) => {  
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/description`, {newDescription}) 
    return result.data[0]
}
const deleteItem = async (roster, item) => {  
    let result = await axios.delete(`http://localhost:3030/roster/${roster.id}/item/${item.id}`) 
    return result.data[0]
}
const changePositions = async (roster, idOne, idTwo) => {  
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/change-positions-items/${idOne}/${idTwo}`) 
    return result.data[0]
}

module.exports = {
    editItem,
    editTitle,
    editDescription,
    deleteItem,
    changePositions
}
