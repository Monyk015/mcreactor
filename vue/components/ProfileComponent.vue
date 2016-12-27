<script>
    import PostComponent from './FeedComponent/PostComponent.vue'

    export default
    {
        components: {
          PostComponent
        },
        data() {
            return {
                posts:[],
                user: null,
                name:'profile'
            }
        },
        created(){
            let path = this.$route.path //'/user/:id/profile'
            let userId = path.split('/')[2]
            $.get(`/user/${userId}`, (res) => {
                this.posts = res.posts
                this.user = res.user
            })
        }
    }
</script>

<style scoped>
</style>
