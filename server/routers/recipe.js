const router = require('express').Router()
const RecipeController = require('../controllers/recipeControllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', RecipeController.show)
router.post('/', RecipeController.post)
// router.put('/:id', authorization, RecipeController.edit)
router.delete('/:id', authorization, RecipeController.delete)

module.exports = router