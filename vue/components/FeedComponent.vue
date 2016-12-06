<script>
    import NewPostComponent from './FeedComponent/NewPostComponent.vue'

    export default
    {
        template:'#feed-component',
        components:{
            NewPostComponent
        },
        data(){
            return {
                title: 'Hello Feed!',
                posts: [],
                showComments: []
            }
        },
        created() {
            $.get('post', (posts) => {
                this.posts = posts
                posts.forEach(() => {
                    this.showComments.push(false)
                })
                console.log(this.posts)
            })
        },
        methods:{
            triggerComments(index){
                this.$set(this.showComments,index,!this.showComments[index])
            }
        }
    }
</script>
