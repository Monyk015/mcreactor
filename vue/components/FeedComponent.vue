<script>
    import NewPostComponent from './FeedComponent/NewPostComponent.vue'
    import PostComponent from './FeedComponent/PostComponent.vue'
    // import VueRouter from 'vue-router'

    
    export default
    {
        components:{
            NewPostComponent,
            PostComponent
        },
        data(){
            return {
                title: 'Hello Feed!',
                posts: []
            }
        },
        created() {
            this.loadData()
        },
        methods:{
            loadData(){
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
            '$route' : 'loadData'
        }
    }
</script>
