require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// Middleware
const accessControlMiddleware = require('./middlewares/access-control')
// Solo por temas del desafio agrego en duro la url de conexión y no en el .env
mongoose.connect('mongodb+srv://jcastrom:test123@cluster0-z05ko.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Conneced to Database'))

app.use(express.json())

const productsRouter = require('./routes/products')
app.use(accessControlMiddleware)
app.use('/products', productsRouter)

app.listen(3000, () => console.log('Server Started'))

