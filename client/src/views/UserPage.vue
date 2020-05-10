<template>
    <div class="UserPage">
        <form class="userForm">
            <label class="label">Email</label>
            <input type="text" class="form-control" placeholder="e.g: xxxxx@mail.id" v-model="email">
            <label class="label">Password</label>
            <input type="password" class="form-control" placeholder="e.g: xxxxx" v-model="password">
            <p v-text="errorMsg"></p>
            <button class="btn btn-primary" @click.prevent="loginUser">Login</button>
        </form>
        <p>OR</p>
        <g-signin-button class="btn btn-primary"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            Sign in with Google
        </g-signin-button>
    </div>    
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserPage',
    props: ['url'],
    data(){
        return {
            email: '',
            password: '',
            login: false,
            errorMsg: '',
            googleSignInParams:{
                client_id: "911577258079-4tvf7c4pn7svpb29vu0b91v5juuoj0io.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        loginUser(){
            axios({
                url: this.url + '/login',
                method: 'POST',
                data : {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                const data = response.data
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)
                this.$emit('isLogin', data.email)
                this.email = ''
                this.password = ''
            })
            .catch(err => {
                this.email = ''
                this.password = ''
                this.errorMsg = err
                console.log(err)
            })
        },
        onSignInSuccess (googleUser) {
            const {id_token} = googleUser.getAuthResponse()
            axios({
                url: this.url + '/googleSignIn',
                method: 'POST',
                data: {
                    id_token
                }
            })
            .then(response => {
                const data = response.data
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('email', data.email)
                this.$emit('isLogin', data.email)
            })
            .catch(err => {
                this.errorMsg = err
            })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    }
}
</script>

<style scoped>
.UserPage{
    padding: 5px;
    text-align: center;
    width: 100%;
    max-width: 300px;
    position: absolute;
    top: 15%;
    left: 40%;
    border: .1em black solid;
    box-shadow: 5px 5px;
}
.UserPage .enterBtn{
    margin: 10px;
    padding: 5px;
    width: 70px;
}
.UserPage .userForm{
    width: 100%;
    padding: 10px;
}
.UserPage .userForm .label{
    text-align: left;
}
</style>