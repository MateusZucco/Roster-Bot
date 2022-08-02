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
        let index = items.length + 1
        items.push(`${index} - ${chat.update.message.text} \n`)
        let text = `${title} \n${description} \n`
        items.map((item) => {
            text = text + item
        })
        return [true, text]

    }
}

module.exports = {
    createRoaster
}
