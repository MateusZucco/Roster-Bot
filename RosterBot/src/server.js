const env = require('./../.env.tokens')
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

const rosterController = require('./functions/create')

let stage = 0

//instanciando bot
const chatBot = new telegraf(env.token)

let arrayButtons = []
const startButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'mandar o Za se foder' }]
const newArrayButtons = [{ id: 101, value: 'Adicionar mais itens' }, { id: 102, value: 'Salvar lista' }]

let buttons = () => extra.markup(
    markup.inlineKeyboard(
        arrayButtons.map(item => markup.callbackButton(item.value, item.id)), { columns: 3 }
    )
)


chatBot.start(async chat => {
    // console.log(chat)
    const from = chat.update.message.from
    // console.log(from)
    const fromFirstName = from.first_name
    const fromLastName = from.last_name
    await chat.reply(`Bem vindo ${fromFirstName.toUpperCase()} ${fromLastName.toUpperCase()}`)
    arrayButtons = startButtons
    await chat.reply(`Escolha:`, buttons())

})
chatBot.action(/[1-9]+/, async chat => {
    // console.log(chat.match[0])
    // console.log(chat)
    // let choice = arrayButtons.filter(item => item.id == chat.match[0])
    switch (arrayButtons[chat.match[0] - 1].id) {
        case 1:
            stage = 'newList'
            await chat.reply('Qual será o titulo da lista?')
            break
        case 101:
            stage = 'newItem'
            await chat.reply('Novo item:')
        
    }
})

chatBot.on('text', async chat => {
    try {
        switch (stage) {
            case 'newList':
                arrayButtons = []
                let result = await rosterController.createRoaster(chat, arrayButtons)
                console.log(result)
                if(result != false){
                    result = result.data
                    console.log(result)
                    // items.push(`${index} - ${chat.update.message.text} \n`)
                    // let text = `${title} \n${description} \n`
                    // let rosterText = []
                    // items.map((item) => {
                    //     rosterText = text + item
                    // })
                    // arrayButtons = newArrayButtons
                    // await chat.reply(result[1], buttons())
                    // stage = 'newItems'
                } 
                break
            case 'newItem':
                let newItem = await rosterController.addItem(chat, result)
                console.log(rosterItems)
        }
    } catch (err) {
        console.log(err)
    }
})
chatBot.startPolling()
