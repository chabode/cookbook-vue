require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000
const routers = require('./routers')
const errorHandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routers)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

module.exports = app