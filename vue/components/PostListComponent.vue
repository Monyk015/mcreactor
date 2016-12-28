
<template>
    <ul>
        <li v-if="!posts.length" class="card">So empty.</li>
        <li v-for="(post,index) in posts" class="card">
            <post-component :post="post"></post-component>
        </li>
    </ul>
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
                posts: []
            }
        },
        created() {
            this.loadPosts()
            if(this.$store.state.user)
                this.$store.commit('loadSubscriptions')
            console.log(this)
        },
        methods:{
            loadPosts(){
                let path = this.$route.path
                if(path == "/")
                    path = 'post'
                $.get(path, (posts) => {
                    this.posts = posts
                    console.log(this.posts)
                })
            }
        },
        watch:{
            '$route' : 'loadPosts'
        }
    }
</script>
