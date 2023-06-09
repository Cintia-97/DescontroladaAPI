const express = require('express')
const app = express()
const cors = require('cors')
const controller = require('./controller/controller')
const port = 3001

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions))

app.get('/list', controller.list)
app.get('/spent/:type', controller.listByType)
app.post('/spent', controller.create)
app.delete('/spent', controller.remove)

app.listen(port, () => {
    console.log(`App is running http://localhost:${port}`)
})