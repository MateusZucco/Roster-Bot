const axios = require('axios')

const deleteRoster = async (roster, jwt) => {
    let result = await axios.delete(`http://localhost:3030/roster/${roster.id}`, { headers: { token: jwt } })
    return result.status
}
module.exports = {
    deleteRoster,
}
