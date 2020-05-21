<template>
    <div class="card">
        <div class="row">
            <div class="col">
                <p> <strong> {{card.meal}} </strong> </p>
                <p style="font-size: .7em">By: {{card.User.email}} </p>
                <p style="font-size: .7em">Created At: {{card.createdAt}} </p>
                <!-- <p style="font-size: .8em" v-show="description"> {{card.instructions}}</p> -->
            </div>
            <div class="col">
                <img :src="card.image" class="float-right">
            </div>
        </div>
        
        <div class="row" style="margin-left: 5px">
            <button class="btn btn-info" style="width: 25%"
            @click.prevent='showInstruction(card.instructions)' >Show Details</button>
            <button class="btn btn-danger" style="width: 20%" @click="hapus(card.id)">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecipeCard',
    props: ['card'],
    methods: {
        hapus(value) {
            if (this.card.User.email === localStorage.getItem('email')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Delete recipe',
                    text: 'Are you sure to delete this recipe?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                })
                .then((result) => {
                    if (result.value){
                        this.$emit('hapus', value)
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: 'You are prohibited to do this!'
                })
            }
        },
        showInstruction(value){
            Swal.fire({
                title: 'How to make this?',
                text: value
            })
        }
    }
}
</script>

<style>
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