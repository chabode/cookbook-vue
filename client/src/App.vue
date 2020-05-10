<template>
    <div id='app'>
        <Navbar :isLogin="isLogin" :email="email" @logout="logout"> </Navbar>
        <UserPage v-if='!isLogin' :url='url' @isLogin='changeLogin'> </UserPage> <!--!isLogin-->
        <RecipePage v-if='isLogin' :url='url'> </RecipePage>
    </div>    
</template>

<script>
import Navbar from './components/NavBar'
import UserPage from './views/UserPage'
import RecipePage from './views/RecipePage'

export default {
    name: 'App',
    components: {
        Navbar,
        UserPage,
        RecipePage
    },
    data() {
        return {
            isLogin: false,
            email: '',
            url: 'http://localhost:3000'
        }
    },
    created() {
        if(localStorage.getItem('access_token')){
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    },
    methods: {
        logout(){
            // var auth2 = gapi.auth2.getAuthInstance()
            // auth2.signOut()
            localStorage.clear()
            this.email = ''
            this.isLogin = false
        },
        changeLogin(email){
            this.email = email
            this.isLogin = true
        }
    }
}
</script>

<style scoped>

</style>