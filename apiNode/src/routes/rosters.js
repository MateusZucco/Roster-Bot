const express = require('express')

const routes = express.Router()

const Controller = require('../controllers/roster')
routes.get('/:userId/list-rosters', Controller.list)
routes.post('/roster', Controller.create)
routes.put('/roster/:rosterId/item/:itemId', Controller.editItem)
routes.put('/roster/:rosterId/title', Controller.editTitle)
routes.put('/roster/:rosterId/description', Controller.editDescription)
routes.delete('/roster/:rosterId', Controller.delete)
routes.delete('/roster/:rosterId/item/:itemId', Controller.deleteItem)
routes.post('/roster-item', Controller.newItem)
module.exports = routes;