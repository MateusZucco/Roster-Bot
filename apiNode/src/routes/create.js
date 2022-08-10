const express = require('express')

const routes = express.Router()

const Controller = require('../controllers/roster')
routes.post('/roster', Controller.create)
routes.post('/roster-item', Controller.newItem)
module.exports = routes;