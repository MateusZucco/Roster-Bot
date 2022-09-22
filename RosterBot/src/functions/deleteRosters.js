const axios = require('axios')

const deleteRoster = async (roster) => {  
    let result = await axios.delete(`http://localhost:3030/roster/${roster.id}`) 
    return result.status
}
module.exports = {
    deleteRoster,
}
