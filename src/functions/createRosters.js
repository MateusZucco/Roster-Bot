const axios = require('axios')


var title = ''
var description = ''
const createRoaster = async (chat, stages) => {
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
        let itens = {text: chat.update.message.text}
        const roster = {title: title, description: description,  userId: 1}
        let result = await axios.post('http://localhost:3030/roster', {roster: roster, itens: itens})
        
        return result.data

    }
}

const addItem = async (newItem, selectedRosterId) => {
    let item = {text: newItem}
    let result = await axios.post(`http://localhost:3030/roster/${selectedRosterId}/new-item`, item)
    return result.data[0]
}


module.exports = {
    createRoaster,
    addItem
}
