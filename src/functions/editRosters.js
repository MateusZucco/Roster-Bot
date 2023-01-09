const axios = require('axios')

const editItem = async (newValue, roster, itemToEdit, jwt) => {
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/item/${itemToEdit.id}`, { newValue }, { headers: { token: jwt } })
    return result.data[0]
}
const editTitle = async (newTitle, roster, jwt) => {
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/title`, { newTitle }, { headers: { token: jwt } })
    return result.data[0]
}
const editDescription = async (newDescription, roster, jwt) => {
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/description`, { newDescription }, { headers: { token: jwt } })
    return result.data[0]
}
const deleteItem = async (roster, item, jwt) => {
    let result = await axios.delete(`http://localhost:3030/roster/${roster.id}/item/${item.id}`, { headers: { token: jwt } })
    return result.data[0]
}
const changePositions = async (roster, idOne, idTwo, jwt) => {
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/change-positions-items/${idOne}/${idTwo}`, { headers: { token: jwt } })
    return result.data[0]
}

module.exports = {
    editItem,
    editTitle,
    editDescription,
    deleteItem,
    changePositions
}
