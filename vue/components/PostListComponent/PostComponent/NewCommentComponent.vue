<template>
    <form id="new-commentary-form" @submit.prevent="onSubmit" class="input-field">
            <textarea name="new-comment" v-model="text" class="materialize-textarea"></textarea>
            <label for="new-comment">New comment</label>
            <button id="submit-comment" type="submit" name="action" class="btn waves-effect waves-light right">
                Submit<i class="material-icons right">send</i>
            </button>
        </form>
</template>

<script>
    export default {
        props:['post'],
        data(){
            return {
                text: ''
            }
        },
        methods:{
            onSubmit() {
                console.log(this)
                let postId = this.post.id
                $.ajax({
                    method:'POST',
                    url:'post/' + postId + '/comment', 
                    data: {content: this.text},
                    success: res => {
                        if(res.success)
                        {
                            this.post.Commentaries = res.comments
                            this.text = ''
                        }                
                    }})
            }
        }
    }
</script>

<style scoped>
    #submit-comment{
        margin: 5px;
        margin-top: -20px;
    }
</style>
