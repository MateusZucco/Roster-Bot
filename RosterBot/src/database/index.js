
const Sequelize = require('sequelize')
const dbconfig = require('../config/database')

// const Client = require('../models/Client')
// const Image = require('../models/Image')
// const News = require('../models/News')
// const Event = require('../models/Event')
// const Artist = require('../models/Artist')

const connection = new Sequelize(dbconfig)

// Client.init(connection)
// Image.init(connection)
// News.init(connection)
// Event.init(connection)
// Artist.init(connection)

// Image.associate(connection.models)
// Client.associate(connection.models)
// Event.associate(connection.models)
// Artist.associate(connection.models)

module.exports = connection