const axios = require('axios')

class FoodAPIController{
    static getFood(req, res){
        axios({
            url: 'https://www.themealdb.com/api/json/v1/1/random.php',
            method: 'GET'
        })
        .then(response => {
            const meals = response.data.meals[0]
            // console.log(meals)
            res.status(200).json({data:meals})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = FoodAPIController