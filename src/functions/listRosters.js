const axios = require('axios')

const listRosters = async (userTelegramId) => {
    let result = await axios.get(`http://localhost:3030/${userTelegramId}/list-rosters`) 
    return result
}
module.exports = {
    listRosters,
}
