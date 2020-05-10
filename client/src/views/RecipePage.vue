<template>
    <div class="container">
        <div class="row">
            <button class="btn btn-primary" v-if="!newRecipe" @click="changeNewRecipe">New Recipe</button>
            <button class="btn btn-primary" v-if="newRecipe" @click="changeNewRecipe">Back</button>
            <NewRecipe v-if="newRecipe" :url='url' @addRecipe='switchUp'></NewRecipe>
        </div>
        <div class="row">
            <RecipeBoard v-show="newRecipe==false" v-for="(category,index) in categories" 
            :key="index" :category="category" :url="url" :cards="filter[category]" 
            @callGetContent='callGetContent'> </RecipeBoard>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
import RecipeBoard from '../components/RecipeBoard'
import NewRecipe from '../components/NewRecipe'

export default {
    name: 'RecipePage',
    props: ['url'],
    components: {
        RecipeBoard,
        NewRecipe
    },
    data(){
        return {
            categories: ['Heavy','Light'],
            cards: [],
            newRecipe : false
        }
    },
    created(){
        this.getContent()
    },
    computed: {
        filter(){
            return {
                Heavy: this.heavy,
                Light: this.light,
            }
        },
        heavy(){
            return this.cards.filter(card => card.category == 'Heavy Meal')
        },
        light(){
            return this.cards.filter(card => card.category == 'Light Meal')
        }
    },
    methods: {
        changeNewRecipe(){
            this.newRecipe = !this.newRecipe
        },
        getContent(){
            const token = localStorage.getItem('access_token')
            axios({
                url: this.url + '/recipe',
                method: 'GET',
                headers: {
                    access_token : token
                }
            })
            .then(response => {
                this.cards = response.data
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        callGetContent(){
            this.getContent()
        },
        switchUp(){
            this.getContent()
            this.newRecipe = !this.newRecipe
        }
    }

}
</script>

<style scoped>
.container{
    /* display: flex; */
    border: .1em solid black;
    justify-content: space-evenly;
    /* width: 100%; */
    max-width: 100%;
    height: 100%;
    overflow: scroll;
}
.btn {
    width: 10%;
    margin: 5px;
}
</style>