const axios = require('axios')

const listRosters = async (jwt) => {
    try {
        let response = await axios.get(`http://localhost:3030/list-rosters`, { headers: { token: jwt } })
        return response.data
    } catch (err) {
        return err.response.data
    }
}
module.exports = {
    listRosters,
}
