<script>
    export default {
        data(){
            return {
                tagsArray:[],
                content: ''
            }
        },
        methods: {
            onSubmit(){
                $.ajax({
                        method:'POST',
                        url:'post', 
                        data: new FormData($('#new-post-form')[0]),
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: res => {
                            if(res.success)
                            {
                                this.tagsArray = []
                                this.content = ''
                                $('#new-post-component .collapsible-header,li').removeClass('active')
                                $('#new-post-component .collapsible-body').hide()
                                $('input[type=file]').val("")
                                $('.file-path-wrapper input').val("")
                                this.$emit('submitted')
                            }                
                        }})
            }
        },
        computed:{
            tags:{
                get(){
                    return this.tagsArray.join(',')
                },
                set(tags){
                    this.tagsArray = tags.split(',')
                }
            }
        }
    }
</script>

<style scoped>
    textarea{
        margin: 0;
    }
    .collapsible-body{
        height: auto;
        padding: 0 10px 0;
    }
    .row{
        padding: 5px 15px 5px;
        margin-bottom: 0;
    }
    .file-field{
        height: 36px;
        margin-top: 0;
    }
    .file-field .btn{
        height: 36px;
        line-height: 36px;
    }
    .file-field .file-path{
        height: 36px;
    }
</style>
