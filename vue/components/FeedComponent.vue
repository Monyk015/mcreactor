<script>
    import NewPostComponent from './FeedComponent/NewPostComponent.vue'
    import PostComponent from './FeedComponent/PostComponent.vue'
    import NavComponent from './FeedComponent/NavComponent.vue'

    export default
    {
        components:{
            NewPostComponent,
            PostComponent,
            NavComponent
        },
        data(){
            return {
                title: 'Hello Feed!',
                posts: [],
                name: 'feed'
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
