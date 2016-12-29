<template>
    <div class="collection">
        <router-link :to="'/user/' + comment.UserId + '/profile'" class="user-nickname collection-item row">{{comment.User.nickname}}</router-link>
        <div class="collection-item collection row">
            <div class="row collection-item">{{comment.content}}</div>
            <div class="row comment-info-row  valign-wrapper">
                <div class="date col s5 valign">{{comment.createdAt | formatDate}}</div>
                <div class="rating col offset-s5 s1 valign">{{comment.rating}}</div>
                <div v-show="$store.state.user" class="valign rates col s2">
                    <span @click="thumbUp"
                          v-bind:class="{'activated-rate': ifThumbUp}"
                          class="material-icons">thumb_up</span>
                    <span
                            @click="thumbDown" v-bind:class="{'activated-rate': ifThumbDown}"
                            class="material-icons">thumb_down</span>
                </div>
            </div>
        </div>
    </div>
</template>

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

    .comment-info-row{
        height: 40px;
        margin-bottom: -10px;
    }
</style>
