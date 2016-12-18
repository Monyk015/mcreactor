<script>
    import Cookies from 'js-cookie'
    const jwt = require('jwt-decode')
    
    export default
    {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        created() {
            
        },
        methods: {
            submit(){
                $.post('', {
                    email: this.email, 
                    password: this.password
                }, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('setUser', jwt(res.token))
                        Cookies.set('token', res.token)
                        window.location.replace('/')
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
