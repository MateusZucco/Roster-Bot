// const telegraf = require('telegraf')
// const extra = require('telegraf/extra')
// const markup = require('telegraf/markup')

// // const BUTTONS_PROTOTYPE = require("../src/helpers/buttons")
// // const BUTTONS = new BUTTONS_PROTOTYPE()

// function Buttons() {
//   this.selectedButtons = []
//   this.menuButtons = [{ id: 1, value: 'Criar nova Lista' }, { id: 2, value: 'Exibir listas salvas' }, { id: 3, value: 'Editar lista' }, { id: 4, value: 'Excluir lista' }]

//   this.sendButtons = () => {
//     extra.markup(
//       markup.inlineKeyboard(
//         this.selectedButtons.map((item) => markup.callbackButton(item.value, item.id)),
//         { columns: 2 }
//       )
//     );
//   },

//   this.loadMenuButtons = async (chat, user) => {
//     this.selectedButtons = this.menuButtons;
//     await chat.reply(
//       `${user.fullName}, selicone uma ação para prosseguir.`,
//       this.sendButtons()
//     );
//   }
// };

// module.exports = Buttons;