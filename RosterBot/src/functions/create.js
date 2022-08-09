const axios = require('axios')

let newListStages = ['title', 'description', 'items', 'save']
var title = ''
var description = ''
var items = []
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
        items = {text: chat.update.message.text, icon: null, postion: 1}
        let index = items.length + 1
        const roster = {title: title, description: description, itemsNumber: index, userId: 1}
        let result = await axios.post('http://localhost:3030/roster', {roster: roster, items: items})
        
        return result

    }
}

const addItem = async (chat, result) => {
    console.log(result)
    let newItem = chat.update.message.text
    await axios.post('http://localhost:3030/roster', newItem)
}


module.exports = {
    createRoaster,
    addItem
}
