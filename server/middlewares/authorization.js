const { Recipe } = require('../models')

function authorization(req, res, next){
    const userId = req.userData.id
    const { id } = req.params
    
    Recipe.findByPk(id)
    .then(recipe => {
        if(!recipe){
            next({name:'Data not found'})
        } else if (recipe.UserId !== userId) {
            next({name:'Forbidden Access'})
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization