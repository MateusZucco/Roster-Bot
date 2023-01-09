const axios = require('axios')

const listRosters = async (jwt) => {
    try {
        let result = await axios.get(`http://localhost:3030/list-rosters`, { headers: { token: jwt } })
        return result
    } catch (err) {
        console.log(err)
        return err
    }
}
module.exports = {
    listRosters,
}
