const axios = require('axios')

const loginUser = async (userTelegramId, password) => {
    let result = await axios.post(`http://localhost:3030/${userTelegramId}/login`, {password: password}) 
    return result
}
module.exports = {
    loginUser,
}
