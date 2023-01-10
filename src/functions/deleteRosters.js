const axios = require('axios')

const deleteRoster = async (roster, jwt) => {
    try{
        let result = await axios.delete(`http://localhost:3030/roster/${roster.id}`, { headers: { token: jwt } })
        return result.status
    }catch(err) {
        return err.response.data
    }

}
module.exports = {
    deleteRoster,
}
