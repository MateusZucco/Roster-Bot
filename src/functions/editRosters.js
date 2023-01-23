const axios = require('axios')

const editItem = async (newValue, roster, itemToEdit, jwt) => {
    try{
        let result = await axios.put(`http://localhost:3030/roster/${roster.id}/item/${itemToEdit.id}`, { newValue }, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}
const editTitle = async (newTitle, roster, jwt) => {
    try{
        let result = await axios.put(`http://localhost:3030/roster/${roster.id}/title`, { newTitle }, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}
const editDescription = async (newDescription, roster, jwt) => {
    try{
        let result = await axios.put(`http://localhost:3030/roster/${roster.id}/description`, { newDescription }, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}
const deleteItem = async (roster, item, jwt) => {
    try{
        let result = await axios.delete(`http://localhost:3030/roster/${roster.id}/item/${item.id}`, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}
const changePositions = async (roster, idOne, idTwo, jwt) => {
    try{
        let result = await axios.put(`http://localhost:3030/roster/${roster.id}/change-positions-items/${idOne}/${idTwo}`, {}, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}

module.exports = {
    editItem,
    editTitle,
    editDescription,
    deleteItem,
    changePositions
}
