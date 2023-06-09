const controller = require('../controller/controller')
const express = require('express')
const app = express()
const router = express.Router()

app.use(express.json())

app.get('/list', controller.list)
app.get('/spent/:type', controller.listByType)
app.post('/spent', controller.create)
app.delete('/spent', controller.remove)


module.exports = routes