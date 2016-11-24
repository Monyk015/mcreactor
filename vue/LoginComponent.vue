<script>
    import Cookies from 'js-cookie'
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
                }, function(res) {
                    if(res.success)
                    {
                        Cookies.set('token', res.token)
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
