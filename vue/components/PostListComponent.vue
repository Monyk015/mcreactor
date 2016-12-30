    
<template>
    <div id="post-list-component">
        <ul>
            <li v-if="!$store.state.posts.length" class="card">
                <div class="card-content">
                    So empty.
                </div>
            </li>
            <li v-for="(post,index) in posts" class="card">
                <post-component :post="post"></post-component>
            </li>
        </ul>
    </div>
</template>

<script>
    import PostComponent from './PostListComponent/PostComponent.vue'

    export default
    {
        components:{
            PostComponent
        },
        data(){
            return {
                
            }
        },
        created() {

        },
        computed:{
            posts(){
                return this.$store.getters.getFoundPosts
            }
        }

    }
</script>
