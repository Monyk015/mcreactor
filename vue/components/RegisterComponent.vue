<template>
    <div class="row">
        <div class="card col s4 offset-s4">
            <form @submit.prevent="submit">
                <div class="input-field">
                    <input id="email" type="email" name="email" v-model="email" class="validate"/>
                    <label data-error="wrong" for="email">Email</label>
                </div>
                <div class="input-field">
                    <input id="email" type="text" name="nickname" v-model="nickname" class="validate"/>
                    <label for="nickname">Nickname</label>
                </div>
                <div class="input-field">
                    <input id="password" type="password" name="password" v-model="password" class="validate"/>
                    <label data-error="wrong" for="password">Password</label>
                </div>
                <div class="input-field">
                    <input id="passwordConfirmation" type="password" name="confirmPassword" v-model="confirmPassword" class="validate"/>
                    <label data-error="doesn't match" for="confirmPassword">Confirm password</label>
                </div>
                <button type="submit" class="waves-effect waves-light btn col s4 offset-s4">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>
    export default
    {
        data() {
            return {
                email: '',
                password: '',
                nickname: '',
                confirmPassword: '',
                name: 'register'
            }
        },
        created() {
            
        },
        methods: {
            submit(){
                $.post('/register', {
                    email: this.email, 
                    password: this.password,
                    nickname: this.nickname,
                    confirmPassword: this.confirmPassword
                }, (res) => {
                    if(res.success)
                    {
                        this.$router.replace('/login')
                    }
                    else if(res.message == "Passwords do not match")
                    {
                        $('#passwordConfirmation').addClass('invalid')
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
