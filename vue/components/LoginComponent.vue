<template>
    <div class="row">
        <div class="card col s4 offset-s4">
            <form @submit.prevent="submit">
                <div class="input-field">
                    <input id="email" type="email" name="email" v-model="email" class="validate"/>
                    <label data-error="wrong" for="email">Email</label>
                </div>
                <div class="input-field">
                    <input id="password" type="password" name="password" v-model="password" class="validate"/>
                    <label data-error="wrong" for="password">Password</label>
                    <button type="submit" class="waves-effect waves-light btn col s4 offset-s4">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    const jwt = require('jwt-decode')
    
    export default
    {
        data() {
            return {
                name: 'login',
                email: '',
                password: ''
            }
        },
        created() {
            
        },
        methods: {
            submit(){
                $.post('/login', {
                    email: this.email, 
                    password: this.password
                }, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('setUser', jwt(res.token))
                        Cookies.set('token', res.token)
                        window.location.replace('/')//todo:through vue router
                    }
                    else if(res.message == 'Wrong password')
                    {
                        $('#password').addClass('invalid')
                    }
                    else
                    {
                        $('#email').addClass('invalid')                        
                    }    
                })
            }
        }  
    }
</script>

<style scoped>
    .card{
        padding: 25px;
    }
</style>
