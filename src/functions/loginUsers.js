const axios = require('axios')

const loginUser = async (userTelegramId, password) => {
    try{
        let response = await axios.post(`http://localhost:3030/${userTelegramId}/login`, {password: password})
        return response.data
    }catch(err) {
        return err.response.data
    }
}
const verifyUserRegister = async (userTelegramId) => {
    return await axios.get(`http://localhost:3030/${userTelegramId}/verify-register`).then((response) => {
        return response.data
    }).catch(
         (error) => {
            throw error.response.data
        }
    )
}
module.exports = {
    loginUser,
    verifyUserRegister
}
