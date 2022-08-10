const express = require('express')
const routes = require('./routes/create')
const app = express()
// const cors = require('cors')

require('./database')

app.use(express.json())
// app.use((req, res, next) => {
//     app.use(cors())
//     res.header("Access-Control-Allow-Origin" , "*")
//     next()
// })
app.set('http://192.168.1.7')
app.use(routes)
app.listen(3030)