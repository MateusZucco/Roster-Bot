// environment variables 
const env = require('./../.env.tokens')

// services
const createFunctions = require('./functions/createRosters')
const editFunctions = require('./functions/editRosters')
const getFunctions = require('./functions/listRosters')

// plugin imports
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

//buttons arrays
let arrayButtons = []
const menuButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'Exibir listas salvas' }, { id: 3, value: 'Editar lista' }, { id: 4, value: 'Excluir lista' }]
const newRosterButtons = [{ id: 101, value: 'Adicionar mais itens' }, { id: 102, value: 'Encerrar lista' }]

//functions
let buttons = () => extra.markup(
    markup.inlineKeyboard(
        arrayButtons.map(item => markup.callbackButton(item.value, item.id)), { columns: 2 }
    )
)

const loadMenuButtons = async (chat) => {
    arrayButtons = menuButtons
    await chat.reply(`Como deseja prosseguir?`, buttons())
}

const printRoster = async (roster) => {
    let resultText = `${roster.title} \n${roster.description}\n`
    roster.rosterItems.map((item) => {
        resultText = ` ${resultText} ${item.position} - ${item.text} \n`
    })
    return resultText
}

//user variables
let userTelegramId = 0

// bot start
const chatBot = new telegraf(env.token)
chatBot.start(async chat => {
    userTelegramId = chat.update.message.chat.id
    const from = chat.update.message.from
    const fromFirstName = from.first_name
    const fromLastName = from.last_name
    await chat.reply(`Bem vindo ${fromFirstName[0].toUpperCase() + fromFirstName.substring(1)} ${fromLastName[0].toUpperCase() + fromLastName.substring(1)}!`)
    await loadMenuButtons(chat)
})

//edit variables
let choice = null
let editStage = 0
let itemToEdit = null
let choiced = null
let isEditing = false
let selectedRosterId = null

chatBot.action(/[1-9]+/, async chat => {
    if (!isEditing) {
        choice = arrayButtons.find(item => item.id == chat.match['input'])
    }
    switch (choice.id) {
        case 1:
            stage = 'newRoster'
            await chat.reply('Qual será o titulo da lista?')
            break
        case 101:
            stage = 'newItem'
            await chat.reply('Novo item:')
            break
        case 102:
            await chat.reply('Lista encerrada com sucesso!')
            await loadMenuButtons(chat)
            break
        case 2:
            let { data: rosters } = await getFunctions.listRosters(userTelegramId)
            await Promise.all(rosters.map(async (roster) => {
                let resultText = await printRoster(roster)
                await chat.reply(resultText)
            }))
            await loadMenuButtons(chat)
            break
        case 3:
            let { data: rostersList } = await getFunctions.listRosters(userTelegramId)
            if (editStage == 0) {
                isEditing = true
                arrayButtons = []
                await Promise.all(rostersList.map(async (roster) => {
                    arrayButtons.push({ id: roster.id, value: roster.title })
                }))
                await chat.reply("Qual lista deseja editar?", buttons())
                editStage = 1
                break
            } else if (editStage == 1) {
                choiced = arrayButtons.find(item => item.id == chat.match['input'])
                choiced = rostersList.find(roster => roster.id == choiced.id)
                let resultText = await printRoster(choiced)
                await chat.reply(resultText)
                arrayButtons = []
                choiced.rosterItems.map((item) => {
                    arrayButtons.push({ id: item.id, value: `${item.position} - ${item.text}` })
                })
                await chat.reply(`Qual item da lista ${choiced.title} deseja editar?`, buttons())
                editStage = 2
                break
            } else if (editStage == 2) {
                itemToEdit = arrayButtons.find(item => item.id == chat.match['input'])
                await chat.reply(`Como deseja renomear ${itemToEdit.value} ?`)
                stage = 'editItem'
            }
    }
})

let stage = null
chatBot.on('text', async chat => {
    try {
        switch (stage) {
            case 'newRoster':
                // arrayButtons = []
                let result = await createFunctions.createRoaster(chat, arrayButtons)
                if (result != false) {
                    let resultText = await printRoster(result)
                    arrayButtons = newRosterButtons
                    await chat.reply(resultText, buttons())
                    selectedRosterId = result.id
                }
                break
            case 'newItem':
                let newRoster = await createFunctions.addItem(chat.update.message.text, selectedRosterId)
                let resultText = await printRoster(newRoster)
                arrayButtons = newRosterButtons
                await chat.reply(resultText, buttons())
                break
            case 'editItem':
                let updatedRoster = await editFunctions.editItem(chat.update.message.text, choiced, itemToEdit)
                let updatedText = await printRoster(updatedRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedText)
                await loadMenuButtons(chat)
                 choice = null
                 editStage = 0
                 itemToEdit = null
                 choiced = null
                 isEditing = false
                 selectedRosterId = null
        }
    } catch (err) {
        console.log(err)
    }
})

// bot load
chatBot.startPolling()
