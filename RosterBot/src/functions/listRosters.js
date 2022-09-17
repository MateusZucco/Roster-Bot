const axios = require('axios')

const listRosters = async (userTelegramId) => {
    // console.log(userTelegramId)
    let result = await axios.get(`http://localhost:3030/${userTelegramId}/list-rosters`) 
    console.log(result.data)
    return result
}
module.exports = {
    listRosters,
}
