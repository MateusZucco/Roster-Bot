// environment variables 
const env = require('./../.env.tokens')

// services
const createFunctions = require('./functions/createRosters')
const editFunctions = require('./functions/editRosters')
const getFunctions = require('./functions/listRosters')
const deleteFunctions = require('./functions/deleteRosters')

// plugin imports
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

//buttons arrays
let arrayButtons = []
const menuButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'Exibir listas salvas' }, { id: 3, value: 'Editar lista' }, { id: 4, value: 'Excluir lista' }]
const newRosterButtons = [{ id: 101, value: 'Adicionar mais itens' }, { id: 102, value: 'Encerrar lista' }]
const updateRosterButtons = [{ id: 301, value: 'Editar título' }, { id: 302, value: 'Editar descrição' }, { id: 303, value: 'Editar itens' }, { id: 304, value: 'Adicionar item' }, { id: 305, value: 'Deletar item' },]

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
const newItem = async (chat, rosterId) => {
    let newRoster = await createFunctions.addItem(chat, rosterId)
    return await printRoster(newRoster)
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
let editItemStage = 0
let editNewItemStage = 0
let deleteRosterStage = 0
let itemToEdit = null
let choicedRoster = null
// let isMenuEdit = false
let selectedRosterId = null

chatBot.action(/[1-9]+/, async chat => {
    if (editStage <= 0 && editItemStage <= 0 && deleteRosterStage <= 0) {
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
            newListStages = ['title', 'description', 'items']
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
                arrayButtons = []
                await Promise.all(rostersList.map(async (roster) => {
                    arrayButtons.push({ id: roster.id, value: roster.title })
                }))
                await chat.reply("Qual lista deseja editar?", buttons())
                editStage = 1
                break
            } else if (editStage == 1) {
                choicedRoster = arrayButtons.find(item => item.id == chat.match['input'])
                choicedRoster = rostersList.find(roster => roster.id == choicedRoster.id)
                let resultText = await printRoster(choicedRoster)
                // await chat.reply(resultText)
                arrayButtons = updateRosterButtons
                await chat.reply(resultText, buttons())
                editStage = 0
                break
            }
        case 303:
            if (editItemStage == 0) {
                console.log(choicedRoster)
                arrayButtons = []
                choicedRoster.rosterItems.map((item) => {
                    arrayButtons.push({ id: item.id, value: `${item.position} - ${item.text}` })
                })
                await chat.reply(`Qual item da lista ${choicedRoster.title} deseja editar?`, buttons())
                editItemStage = 1
                break
            } else if (editItemStage == 1) {
                itemToEdit = arrayButtons.find(item => item.id == chat.match['input'])
                await chat.reply(`Como deseja renomear ${itemToEdit.value} ?`)
                stage = 'editItem'
                editItemStage = 0
                break
            }

        case 304:
            await chat.reply(`Novo item:`)
            stage = 'editNewItem'
            break
        case 4:
            if (deleteRosterStage == 0) {
            let { data: allRosters } = await getFunctions.listRosters(userTelegramId)
                arrayButtons = []
                await Promise.all(allRosters.map(async (roster) => {
                    arrayButtons.push({ id: roster.id, value: roster.title })
                }))
                await chat.reply("Qual lista excluir?", buttons())
                deleteRosterStage = 1
            } else if (deleteRosterStage == 1) {
                let rosterToDelete = arrayButtons.find(item => item.id == chat.match['input'])
                let response = await deleteFunctions.deleteRoster(rosterToDelete)
                deleteRosterStage = 0
                if (response == 200){
                    await chat.reply("Lista excluida com sucesso!")
                    await loadMenuButtons(chat)
                }
            }
    }
})

let stage = null
let newListStages = ['title', 'description', 'items']
chatBot.on('text', async chat => {
    try {
        switch (stage) {
            case 'newRoster':
                // arrayButtons = []
                let result = await createFunctions.createRoaster(chat, newListStages)
                if (result != false) {
                    let resultText = await printRoster(result)
                    arrayButtons = newRosterButtons
                    await chat.reply(resultText, buttons())
                    selectedRosterId = result.id
                }
                break
            case 'newItem':
                let resultText = await newItem(chat.update.message.text, selectedRosterId)
                arrayButtons = newRosterButtons
                await chat.reply(resultText, buttons())
                break
            case 'editItem':
                let updatedRoster = await editFunctions.editItem(chat.update.message.text, choicedRoster, itemToEdit)
                let updatedText = await printRoster(updatedRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedText)
                await loadMenuButtons(chat)
                choice = null
                itemToEdit = null
                choicedRoster = null
                selectedRosterId = null
                break
            case 'editNewItem':
                console.log(choicedRoster)
                let newItemText = await newItem(chat.update.message.text, choicedRoster.id)
                await chat.reply(`Item adicionado com sucesso!`)
                await chat.reply(newItemText)
                await loadMenuButtons(chat)
                choice = null
                itemToEdit = null
                choicedRoster = null
                selectedRosterId = null
                break
        }
    } catch (err) {
        console.log(err)
    }
})

// bot load
chatBot.startPolling()
