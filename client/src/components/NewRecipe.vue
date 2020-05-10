<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-primary col-sm-3" style="height: 10%; top: 125px"
            @click.prevent="generateNewRecipe">Generate New Recipe from Web</button>
            
            <p class="col-sm-3" style="left:100px; top:150px;">- OR -</p>
       
            <form class="col-sm-5">
                <h3>Make Your Own Recipe</h3>
                <div class="form-group">
                    <label>Meal Name</label>
                    <input v-model="meal" placeholder="e.g: Satai Ayam">
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input v-model="category" placeholder="Heavy Meal">
                </div>
                <div class="form-group">
                    <label>Instruction</label>
                    <textarea class="form-control" v-model="instructions" placeholder="Put your instruction here" rows="5"></textarea>
                </div>
                <div class="form-group">
                    <label>Image Url</label>
                    <input v-model="image" placeholder="e.g: imgur.com/xxxx">
                </div>
                <button type="submit" class="btn btn-info" @click.prevent="addNewRecipe">Submit</button>
            </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'NewRecipe',
    props: ['url'],
    data(){
        return {
            meal : '',
            category: '',
            instructions: '',
            image: ''
        }
    },
    methods: {
        generateNewRecipe(){
            axios({
                url : this.url + '/food',
                method: "GET"
            })
            .then(response => {
                let food = response.data.data
                this.meal = food.strMeal
                this.category = food.strCategory
                this.instructions = food.strInstructions
                this.image = food.strMealThumb
                console.log(food)
            })
            .catch(err => {
                console.log(err)
            })
        },
        addNewRecipe(){
            axios({
                url: this.url + '/recipe',
                method: "POST",
                data:{
                    meal: this.meal,
                    category: this.category,
                    instructions: this.instructions,
                    image: this.image
                },
                headers: {
                    access_token : localStorage.getItem('access_token')
                }
            })
            .then(response => {
                this.$emit('addRecipe')
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

}
</script>

<style scoped>
.row{
    margin-left: 50px;
}
</style>