const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

const database = require('./src/helpers/database')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(helmet())

database.connect().then()

const transactionRoutes = require('./src/routes/transaction')

app.use('/api/v1/transaction', transactionRoutes)

app.listen(PORT, () => {
    console.log('Server Listening on PORT:', PORT)
})
