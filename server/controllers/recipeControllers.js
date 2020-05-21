const { Recipe, User } = require('../models')

class RecipeController{
    static show(req, res, next){
        Recipe.findAll({
            include : [{model:User}]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static post(req, res, next){
        const UserId = req.userData.id
        const { meal, category, instructions, image } = req.body
        Recipe.create({
            meal, category, instructions, image, UserId
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    // static edit(req, res, next){
    //     const id = req.params.id
    //     const { meal, category, instructions, image } = req.body
    //     Recipe.update({
    //         meal, category, instructions, image
    //     }, {
    //         where : {id}
    //     })
    //     .then(data => {
    //         if (data == 1){
    //             res.status(200).json(data)
    //         } else {
    //             next({name: `Data not found`})
    //         }
    //     })
    //     .catch(err => {
    //         next(err)
    //     })
    // }

    static delete(req, res, next){
        const id = req.params.id
        Recipe.destroy({
            where : {id}
        })
        .then(data => {
            if (data == 1){
                res.status(200).json(data)
            } else {
                next({name : 'Data not found'})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = RecipeController