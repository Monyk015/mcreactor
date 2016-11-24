<script>
    import Cookies from 'js-cookie'
    const jwt = require('jwt-decode')
    
    export default
    {
        template: '#login-component',
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
