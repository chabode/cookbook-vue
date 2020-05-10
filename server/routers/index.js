const routers = require('express').Router()
const FoodAPIControllers = require('../controllers/foodAPIControllers')
const UserControllers = require('../controllers/userControllers')
const recipeRouter = require('./recipe')

routers.get('/', (req,res) => {
    res.send('Hello')
})
routers.use('/food', FoodAPIControllers.getFood)
routers.post('/register', UserControllers.register)
routers.post('/login', UserControllers.login)
routers.post('/googleSignIn', UserControllers.googleSignIn)
routers.use('/recipe',recipeRouter)

module.exports = routers