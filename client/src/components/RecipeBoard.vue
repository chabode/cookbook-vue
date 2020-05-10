<template>
    <div class="board">
        <div class="title">
            <p style="text-align: center;"> {{category}} Meal </p>
        </div>
        <div class="wrapper">
            <div v-for="(card,index) in cards" :key='index' :card='card'>
                <div class="card">
                    <div class="row">
                        <div class="col">
                            <p> <strong> {{card.meal}} </strong> </p>
                            <p style="font-size: .7em">By: {{card.User.email}} </p>
                            <p style="font-size: .7em">Created At: {{card.createdAt}} </p>
                            <p style="font-size: .8em" v-show="description"> {{card.instructions}}</p>
                        </div>
                        <div class="col">
                            <img :src="card.image" class="float-right">
                        </div>
                    </div>
                    
                    <div class="row" style="margin-left: 5px">
                        <button class="btn btn-info" style="width: 25%" @click.prevent='showInstruction' >Show Details</button>
                        <button class="btn btn-danger" style="width: 20%" @click="hapus(card.id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import axios from 'axios'

export default {
    name: 'RecipeBoard',
    props: ['category', 'cards', 'url'],
    data(){
        return {
            description: false
        }
    },
    methods: {
        showInstruction(){
            this.description = !this.description
        },
        hapus(value){
            console.log(value)
            const token = localStorage.getItem('access_token')
            axios({
                url: `${this.url}/recipe/${value}`,
                method: 'DELETE',
                headers: {
                    access_token: token
                }
            })
            .then(response => {
                this.$emit('callGetContent')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.board{
    border: solid red .1em;
    margin: 5px;
    padding: 5px;
    height: 100%;
    width: 49%;
}
.wrapper{
    /* border: solid brown .1em; */
    background-color: green;
    height: 100%;
    overflow: scroll;
}
.card{
    display: flex;
    flex-direction: column;
    left: 0;
    margin: 10px;
    margin-left: 10px;
    padding: 5px;
}
.card img{
    width: 150px;
    border-radius: 50%;
}
.col{
    width: 50%;
    /* border: .1em solid black; */
}
</style>