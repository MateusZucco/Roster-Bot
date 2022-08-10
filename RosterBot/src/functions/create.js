const axios = require('axios')

let newListStages = ['title', 'description', 'items', 'save']
var title = ''
var description = ''
const createRoaster = async (chat) => {
    if (newListStages[0] == 'title') {
        title = chat.update.message.text
        await chat.reply('Qual a descrição da lista?')
        newListStages.splice(0, 1)
        return false
    } else if (newListStages[0] == 'description') {
        description = chat.update.message.text
        newListStages.splice(0, 1)
        await chat.reply('Adicione o primeiro item: ')
        return false
    } else if (newListStages[0] == 'items') {
        let item = {text: chat.update.message.text, icon: null, position: 1}
        let index = 1
        const roster = {title: title, description: description, itemsNumber: index, userId: 1}
        let result = await axios.post('http://localhost:3030/roster', {roster: roster, items: item})
        
        return result

    }
}

const addItem = async (newItem, selectedRosterId) => {
    let item = {text: newItem, icon: null, position: null, rosterId: selectedRosterId}
    let result = await axios.post('http://localhost:3030/roster-item', item)
    return result.data[0]
}


module.exports = {
    createRoaster,
    addItem
}
