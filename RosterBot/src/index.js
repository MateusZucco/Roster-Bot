const env = require('./../.env')
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

//instanciando bot
const chatBot = new telegraf(env.token)

let arrayButtons = [{id:1, value:'Criar nova Lista'}, {id:2, value:'mandar o Za se foder'}]

const buttons = () => extra.markup(
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
    await chat.reply(`Escolha:`, buttons())

})
chatBot.action(/[1-9]+/, chat => {
    let choice = arrayButtons.filter(item => item.id == chat.match[0])
    console.log(choice)
})
chatBot.startPolling()
