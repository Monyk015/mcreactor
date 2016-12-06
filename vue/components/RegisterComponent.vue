<script>
    export default
    {
        template: '#register-component',
        data() {
            return {
                email: '',
                password: '',
                nickname: '',
                confirmPassword: ''
            }
        },
        created() {
            
        },
        methods: {
            submit(){
                $.post('', {
                    email: this.email, 
                    password: this.password,
                    nickname: this.nickname,
                    confirmPassword: this.confirmPassword
                }, (res) => {
                    if(res.success)
                    {
                        window.location.replace('/login')
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
