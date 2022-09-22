const axios = require('axios')

const editItem = async (newValue, roster, itemToEdit) => {  
    let result = await axios.put(`http://localhost:3030/roster/${roster.id}/item/${itemToEdit.id}`, {newValue}) 
    return result.data[0]
}
module.exports = {
    editItem,
}
