<script>
    export default {
        props: ['comment'],
        data(){
            return {
                rate: 0
            }
        },
        created(){
            if(this.comment.CommentaryRates && this.comment.CommentaryRates[0])
            {
                this.rate = this.comment.CommentaryRates[0].rate
            }
            else
            {
                this.rate = 0
            }

            if(!this.comment.rating)
                this.comment.rating = 0
        },
        computed:{
            ifThumbUp(){
                return this.rate == 1
            },
            ifThumbDown(){
                return this.rate == -1
            },
        },
        methods: {
            thumbUp(){
                if(this.rate == 1)
                {
                    $.get(`/comment/${this.comment.id}/rate/neutral`,(res) => {
                        if(res.success)
                        {
                            this.comment.rating = res.rating 
                        }
                    })
                    this.rate = 0
                }
                else{
                    $.get(`/comment/${this.comment.id}/rate/like`,(res) => {
                        if(res.success)
                        {
                            this.comment.rating = res.rating
                        }
                    })
                    this.rate = 1
                }
            },
            thumbDown(){
                if(this.rate == -1)
                {
                    $.get(`/comment/${this.comment.id}/rate/neutral`,(res) => {
                        if(res.success)
                        {
                            this.comment.rating = res.rating 
                        }
                    })
                    this.rate = 0
                }
                else{
                    $.get(`/comment/${this.comment.id}/rate/dislike`,(res) => {
                        if(res.success)
                        {
                            this.comment.rating = res.rating 
                        }
                    })
                    this.rate = -1
                }
            }
        }
    }


</script>

<style scoped>
    .row{
        margin-bottom: 0;
    }
    .user-nickname{
        
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
