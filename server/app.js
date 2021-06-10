require('dotenv').config()

//set up express
const express = require('express')
const app = express()
const cors = require('cors')
const APIService = require('./services/APIService')
const APIController = require('./controllers/APIController')
const APIRouter = require('./routes/APIRouter')

//set up knex (for db)
const { production, development, test } = require('./knexfile')
const environment = process.env.NODE_ENV === 'test' ? test : (process.env.NODE_ENV === 'production' ? production : development)
const knex = require('knex')(environment)

//middleware
app.use(cors({
    origin:"*",
    credentials: true
}))


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
const apiService = new APIService(knex)
const apiController = new APIController(apiService)
const apiRouter = new APIRouter(apiController)
app.use('/api', apiRouter.createRouter())

app.set('port', process.env.PORT || 8000)

module.exports = app