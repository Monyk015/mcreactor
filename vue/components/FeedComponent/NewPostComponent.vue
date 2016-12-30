<template>
    <div id="new-post-component">
            <ul data-collapsible="accordion" class="collapsible">
                <li class="white">
                    <div class="collapsible-header"><i class="material-icons">add </i>New post</div>
                    <div class="collapsible-body white">
                        <form id="new-post-form" @submit.prevent="onSubmit">
                            <div class="input-field">
                                <input id="tags" type="text" name="tags" v-model="tags"/>
                                <label for="tags">Tags</label>
                            </div>
                            <div class="input-field">
                                <textarea id="content" name="content" v-model="content" class="materialize-textarea"></textarea>
                                <label for="content">Content</label>
                            </div>
                            <div class="row">
                                <div class="file-field input-field left">
                                    <button class="btn">Image
                                        <input id="image" name="image" type="file"/>
                                    </button>
                                    <div class="file-path-wrapper">
                                        <input type="text" class="file-path validate"/>
                                    </div>
                                </div>
                                <button id="submit-post" type="submit" name="action" class="btn waves-effect waves-light right">
                                    Submit<i class="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
</template>

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
                                this.$store.commit('loadPosts', this.$route.path)
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
