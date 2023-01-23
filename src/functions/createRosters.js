const axios = require('axios')


var title = ''
var description = ''
const createRoaster = async (chat, stages, jwt) => {
    if (stages[0] == 'title') {
        title = chat.update.message.text
        await chat.reply('Qual a descrição da lista?')
        stages.splice(0, 1)
        return false
    } else if (stages[0] == 'description') {
        description = chat.update.message.text
        stages.splice(0, 1)
        await chat.reply("Novos itens: (caso vá adicionar mais de um item, separe-os por ';')")
        return false
    } else if (stages[0] == 'items') {
        let itens = { text: chat.update.message.text }
        const roster = { title: title, description: description}
        
        try{
            let response = await axios.post('http://localhost:3030/roster', { roster: roster, itens: itens }, { headers: { token: jwt } })
            return response.data
        }catch(err) {
            return err.response.data
        }

    }
}

const addItem = async (newItem, selectedRosterId, jwt) => {
    let item = { text: newItem }
    try{
        let result = await axios.post(`http://localhost:3030/roster/${selectedRosterId}/new-item`, item, { headers: { token: jwt } })
        return result.data
    }catch(err){
        return err.response.data
    }
}


module.exports = {
    createRoaster,
    addItem
}
