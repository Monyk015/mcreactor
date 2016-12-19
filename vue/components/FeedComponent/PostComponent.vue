<script>
    import CommentComponent from './PostComponent/CommentComponent.vue'    
    import NewCommentComponent from './PostComponent/NewCommentComponent.vue'    

    export default {
        props: ['post'],
        data(){
            return {
                showComments: false,
                rate: 0
            }
        },
        computed:{
            ifThumbUp(){
                return this.rate == 1
            },
            ifThumbDown(){
                return this.rate == -1
            }
        },
        components:{
            CommentComponent,
            NewCommentComponent
        },
        methods:{
            triggerComments(){
                this.showComments = !this.showComments
            },
            thumbUp(){
                if(this.rate == 1)
                {
                    $.get(`/post/${this.post.id}/rate/neutral`,(res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating 
                        }
                    })
                    this.rate = 0
                }
                else{
                    $.get(`/post/${this.post.id}/rate/like`,(res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating
                        }
                    })
                    this.rate = 1
                }
            },
            thumbDown(){
                if(this.rate == -1)
                {
                    $.get(`/post/${this.post.id}/rate/neutral`,(res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating 
                        }
                    })
                    this.rate = 0
                }
                else{
                    $.get(`/post/${this.post.id}/rate/dislike`,(res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating 
                        }
                    })
                    this.rate = -1
                }
            }
        },
        created(){
            if(this.post.PostRates && this.post.PostRates[0])
            {
                this.rate = this.post.PostRates[0].rate
            }
            else
            {
                this.rate = 0
            }

            if(!this.post.rating)
                this.post.rating = 0
        }
    }
</script>

<style scoped>
    .userinfo {
        padding: 15px;
        font-size: 25px;
    }
    .rates span {
        color: rgba(0,0,0,0.30)    
    }
    .rates span:hover{
        color: rgba(0,0,0,0.87);
        cursor: context-menu;    
    }
    .activated-rate{
        color: rgba(0,0,0,0.87) !important;        
    }
</style>
