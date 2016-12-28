<template>
    <div class="row">
        <div class="col s8">
            <template v-if="this.$store.state.user">
                <new-post-component @submitted="loadPosts"></new-post-component>
            </template>
            <post-list-component :posts="posts"></post-list-component>
        </div>
        <nav-component class="col s4"></nav-component>
    </div>
</template>

<script>
    import NewPostComponent from './FeedComponent/NewPostComponent.vue'
    import PostListComponent from './PostListComponent.vue'
    import NavComponent from './FeedComponent/NavComponent.vue'

    export default
    {
        components: {
            NewPostComponent,
            PostListComponent,
            NavComponent
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
        },
        methods: {
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
        watch: {
            '$route': 'loadPosts'
        }
    }
</script>
