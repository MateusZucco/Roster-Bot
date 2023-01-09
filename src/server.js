// environment variables 
const env = require('./../.env.tokens')

// services
const createFunctions = require('./functions/createRosters')
const editFunctions = require('./functions/editRosters')
const getFunctions = require('./functions/listRosters')
const deleteFunctions = require('./functions/deleteRosters')
const loginFunctions = require('./functions/loginUsers')

// plugin imports
const telegraf = require('telegraf')
const extra = require('telegraf/extra')
const markup = require('telegraf/markup')

//buttons arrays
let arrayButtons = []
const menuButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'Exibir listas salvas' }, { id: 3, value: 'Editar lista' }, { id: 4, value: 'Excluir lista' }]
const newRosterButtons = [{ id: 101, value: 'Adicionar mais itens' }, { id: 102, value: 'Encerrar lista' }]
const updateRosterButtons = [{ id: 301, value: 'Editar título' }, { id: 302, value: 'Editar descrição' }, { id: 303, value: 'Editar item' }, { id: 304, value: 'Adicionar items' }, { id: 305, value: 'Deletar item' }, { id: 306, value: 'Alterar posições' }]

//functions
let buttons = () => extra.markup(
    markup.inlineKeyboard(
        arrayButtons.map(item => markup.callbackButton(item.value, item.id)), { columns: 2 }
    )
)

const loadMenuButtons = async (chat) => {
    arrayButtons = menuButtons
    await chat.reply(`${user.fullName}, selicone uma ação para prosseguir.`, buttons())
}

const printRoster = async (roster) => {
    let resultText = `${roster.title} \n${roster.description}\n`
    roster.rosterItems.map((item) => {
        resultText = ` ${resultText} ${item.position} - ${item.text} \n`
    })
    return resultText
}
const newItem = async (chat, rosterId) => {
    let newRoster = await createFunctions.addItem(chat, rosterId, user.jwtToken)
    return await printRoster(newRoster)
}

//user variables
let user = {
    telegramId: null,
    fullName: null,
    jwtToken: null,
    from: null,
}
let stage = null


// bot start
const chatBot = new telegraf(env.token)
chatBot.start(async chat => {
    user.userTelegramId = `${chat.update.message.chat.id}`
    user.from = chat.update.message.from
    user.fullName = `${user.from.first_name[0].toUpperCase() + user.from.first_name.substring(1)} ${user.from.last_name[0].toUpperCase() + user.from.last_name.substring(1)}` 
    await chat.reply(`Bem vindo ${user.fullName}!`)
    await chat.reply(`Por favor insira sua senha:`)
    stage = 'login'
    // await loadMenuButtons(chat)
})

//edit variables
let choice = {}
let editStage = 0
let editItemStage = 0
let idOne = 0
let idTwo = 0
let deleteRosterStage = 0
let itemToEdit = null
let itemToExclude = null
let choicedRoster = null
let selectedRosterId = null

chatBot.action(/[1-9]+/, async chat => {
    if (editStage <= 0 && editItemStage <= 0 && deleteRosterStage <= 0) {
        let selectedButton = arrayButtons.find(item => item.id == chat.match['input'])
        if (!!selectedButton) {
            choice = selectedButton
        }
    }
    switch (choice.id) {
        case 1:
            stage = 'newRoster'
            await chat.reply('Qual será o titulo da lista?')
            break
        case 101:
            stage = 'newItem'
            await chat.reply("Novos itens: (caso vá adicionar mais de um item, separe-os por ';')")
            break
        case 102:
            newListStages = ['title', 'description', 'items']
            await chat.reply('Lista encerrada com sucesso!')
            await loadMenuButtons(chat)
            break
        case 2:
            let { data: rosters } = await getFunctions.listRosters(user.jwtToken)
            if (rosters.length > 0) {
                await Promise.all(rosters.map(async (roster) => {
                    let resultText = await printRoster(roster)
                    await chat.reply(resultText)
                }))
            } else {
                await chat.reply('Nenhuma lista salva.')
            }
            await loadMenuButtons(chat)
            break
        case 3:
            let { data: rostersList } = await getFunctions.listRosters(user.jwtToken)
            if (rostersList.length > 0) {
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
            } else {
                await chat.reply('Nenhuma lista salva.')
                await loadMenuButtons(chat)
                break
            }
        case 301:
            await chat.reply(`Qual o novo título da lista?`)
            stage = 'editTitle'
            break
        case 302:
            await chat.reply(`Qual a nova descrição da lista?`)
            stage = 'editDescription'
            break
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
            await chat.reply("Novos itens: (caso vá adicionar mais de um item, separe-os por ';')")
            stage = 'editNewItem'
            break
        case 305:
            if (editItemStage == 0) {
                arrayButtons = []
                choicedRoster.rosterItems.map((item) => {
                    arrayButtons.push({ id: item.id, value: `${item.position} - ${item.text}` })
                })
                await chat.reply(`Qual item da lista ${choicedRoster.title} deseja excluir?`, buttons())
                editItemStage = 1
                break
            } else if (editItemStage == 1) {
                itemToExclude = arrayButtons.find(item => item.id == chat.match['input'])
                let deletedItemRoster = await editFunctions.deleteItem(choicedRoster, itemToExclude, user.jwtToken)
                let updatedItemsRoster = await printRoster(deletedItemRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedItemsRoster)
                await loadMenuButtons(chat)
                choice = null
                choicedRoster = null
                selectedRosterId = null
                editItemStage = 0
                break
            }
        case 306:
            if (editItemStage == 0) {
                arrayButtons = []
                choicedRoster.rosterItems.map((item) => {
                    arrayButtons.push({ id: item.id, value: `${item.position} - ${item.text}` })
                })
                await chat.reply(`Selecione o primerio item:`, buttons())
                arrayButtons = []
                editItemStage = 1
                break
            } else if (editItemStage == 1) {
                idOne = chat.match['input']
                choicedRoster.rosterItems.map((item) => {
                    if (item.id != idOne) {
                        arrayButtons.push({ id: item.id, value: `${item.position} - ${item.text}` })
                    }
                })
                await chat.reply(`Selecione o segundo item:`, buttons())
                editItemStage = 2
                break
            } else if (editItemStage == 2) {
                idTwo = chat.match['input']
                let updatedRoster = await editFunctions.changePositions(choicedRoster, idOne, idTwo, user.jwtToken)
                let updatedText = await printRoster(updatedRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedText)
                await loadMenuButtons(chat)
                choice = null
                itemToEdit = null
                choicedRoster = null
                selectedRosterId = null
                editItemStage = 0
                idOne = 0
                idTwo = 0
                break
            }
        case 4:
            if (deleteRosterStage == 0) {
                let { data: allRosters } = await getFunctions.listRosters(user.jwtToken)
                arrayButtons = []
                await Promise.all(allRosters.map(async (roster) => {
                    arrayButtons.push({ id: roster.id, value: roster.title })
                }))
                await chat.reply("Qual lista excluir?", buttons())
                deleteRosterStage = 1
            } else if (deleteRosterStage == 1) {
                let rosterToDelete = arrayButtons.find(item => item.id == chat.match['input'])
                let response = await deleteFunctions.deleteRoster(rosterToDelete, user.jwtToken)
                deleteRosterStage = 0
                if (response == 200) {
                    await chat.reply("Lista excluida com sucesso!")
                    await loadMenuButtons(chat)
                }
            }
    }
})


let newListStages = ['title', 'description', 'items']
chatBot.on('text', async chat => {
    try {
        switch (stage) {
            case 'login':
                let loginResult = await loginFunctions.loginUser(user.userTelegramId, chat.update.message.text)
                if(loginResult.data.error){
                    await chat.reply(`${loginResult.data.error}`)
                    await chat.reply("Insira a senha novamente:")
                }else{
                    await chat.reply("Usuário logado com sucesso!")
                    user.jwtToken = loginResult.data.token
                    await loadMenuButtons(chat)
                }
                break;
            case 'newRoster':
                // arrayButtons = []
                let result = await createFunctions.createRoaster(chat, newListStages, user.jwtToken)
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
                let updatedRoster = await editFunctions.editItem(chat.update.message.text, choicedRoster, itemToEdit, user.jwtToken)
                let updatedText = await printRoster(updatedRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedText)
                await loadMenuButtons(chat)
                choice = null
                itemToEdit = null
                choicedRoster = null
                selectedRosterId = null
                break
            case 'editTitle':
                let editedRoster = await editFunctions.editTitle(chat.update.message.text, choicedRoster, user.jwtToken)
                let updated = await printRoster(editedRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updated)
                await loadMenuButtons(chat)
                choice = null
                choicedRoster = null
                selectedRosterId = null
                break
            case 'editDescription':
                let editedDescriptionRoster = await editFunctions.editDescription(chat.update.message.text, choicedRoster, user.jwtToken)
                let updatedDescription = await printRoster(editedDescriptionRoster)
                await chat.reply(`Lista editada com sucesso!`)
                await chat.reply(updatedDescription)
                await loadMenuButtons(chat)
                choice = null
                choicedRoster = null
                selectedRosterId = null
                break
            case 'editNewItem':
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
