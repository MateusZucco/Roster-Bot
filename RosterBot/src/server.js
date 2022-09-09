const env = require('./../.env.tokens')
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

const rosterController = require('./functions/create')

let stage = 0
let selectedRosterId = null
//instanciando bot
const chatBot = new telegraf(env.token)

let arrayButtons = []
const startButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'Exibir listas salvas' }]
const newArrayButtons = [{ id: 101, value: 'Adicionar mais itens' }, { id: 102, value: 'Encerrar lista' }]

let buttons = () => extra.markup(
    markup.inlineKeyboard(
        arrayButtons.map(item => markup.callbackButton(item.value, item.id)), { columns: 3 }
    )
)


chatBot.start(async chat => {
    console.log(chat.update.message.chat)
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
    let choice = arrayButtons.filter(item => item.id == chat.match['input'])
    console.log(choice)
    switch (choice[0].id) {
        case 1:
            stage = 'newList'
            await chat.reply('Qual será o titulo da lista?')
            break
        case 2:

        case 101:
            stage = 'newItem'
            await chat.reply('Novo item:')
            break
        case 102:
            await chat.reply('Lista encerrada com sucesso!')
            arrayButtons = startButtons
            stage = 'Menu'
            await chat.reply('Como deseja prosseguir?', buttons())
            break

    }
})

chatBot.on('text', async chat => {
    try {
        switch (stage) {
            case 'newList':
                arrayButtons = []
                let result = await rosterController.createRoaster(chat, arrayButtons)
                if (result != false) {
                    result = result.data
                    let resultText = `${result.roster.title} \n${result.roster.description}\n`
                    result.items.map((item) => {
                        resultText = ` ${resultText} ${item.position} - ${item.text} \n`
                    })
                    arrayButtons = newArrayButtons
                    // await chat.reply(result[1], buttons())
                    await chat.reply(resultText, buttons())
                    selectedRosterId = result.roster.id
                    // stage = 'newItems'
                }
                break
            case 'newItem':
                let updatedRoster = await rosterController.addItem(chat.update.message.text, selectedRosterId)
                let resultText = `${updatedRoster.title} \n${updatedRoster.description}\n`
                updatedRoster.rosterItems.map((item) => {
                    resultText = ` ${resultText} ${item.position} - ${item.text} \n`
                })
                arrayButtons = newArrayButtons
                await chat.reply(resultText, buttons())

        }
    } catch (err) {
        console.log(err)
    }
})
chatBot.startPolling()
