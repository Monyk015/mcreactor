<template>
    <div class="collection">
        <router-link :to="'/user/' + post.UserId + '/profile'"
                     class="userinfo collection-item">{{post.User.nickname}}
        </router-link>
        <div class="collection-item" v-if="post.Tags.length">
            <div v-for="tag in post.Tags" class="chip">
                <router-link v-bind:to="'/post/tag/' + tag.id">{{tag.name}}</router-link>
            </div>
        </div>
        <div class="row collection-item">
            <p class="col s12">{{post.content}}</p>
            <img v-if="post.image" v-bind:src="'images/' + post.image"/>
        </div>
        <div class="info row collection-item">
            <div class="date col s3">{{post.createdAt | formatDate}}</div>
            <router-link v-bind:to="'/post/' + post.id" class="link col s1">Link</router-link>
            <div class="row col s4 offset-s4">
                <div class="rating col s2 offset-s2">{{post.rating}}</div>
                <div v-if="$store.state.user" class="rates col s8"><span @click="thumbUp"
                                                                         v-bind:class="{'activated-rate': ifThumbUp}"
                                                                         class="material-icons">thumb_up</span><span
                        @click="thumbDown" v-bind:class="{'activated-rate': ifThumbDown}"
                        class="material-icons">thumb_down</span>
                </div>
            </div>
        </div>
        <div v-if="$store.state.user && ($store.state.user.isAdmin || $store.state.user.id == post.UserId)" class="card-action admin-actions collection-item">
            <a @click="deletePost">Delete post</a>
        </div>
        <div class="comments row collection-item">
            <div class="col s12">
                <div @click="triggerComments" class="trigger valign-wrapper">
                    <span v-if="showComments" class="material-icons valign">keyboard_arrow_up</span>
                    <span v-else="v-else" class="material-icons valign">keyboard_arrow_down</span>
                    <span class="valign">
                        Comments
                    </span>
                </div>
                <div v-if="showComments" class="display-comments collection">
                    <ul>
                        <li v-for="comment in post.Commentaries" class="collection-item">
                            <comment-component :comment="comment"></comment-component>
                        </li>
                        <li v-if="this.$store.state.user && !this.$store.state.user.isBanned" class="collection-item">
                            <new-comment-component :post="post"></new-comment-component>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

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
        computed: {
            ifThumbUp(){
                return this.rate == 1
            },
            ifThumbDown(){
                return this.rate == -1
            }
        },
        components: {
            CommentComponent,
            NewCommentComponent
        },
        methods: {
            triggerComments(){
                this.showComments = !this.showComments
            },
            thumbUp(){
                if(this.rate == 1)
                {
                    $.get(`/post/${this.post.id}/rate/neutral`, (res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating
                        }
                    })
                    this.rate = 0
                }
                else
                {
                    $.get(`/post/${this.post.id}/rate/like`, (res) => {
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
                    $.get(`/post/${this.post.id}/rate/neutral`, (res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating
                        }
                    })
                    this.rate = 0
                }
                else
                {
                    $.get(`/post/${this.post.id}/rate/dislike`, (res) => {
                        if(res.success)
                        {
                            this.post.rating = res.rating
                        }
                    })
                    this.rate = -1
                }
            },
            deletePost(){
                $.get(`/post/${this.post.id}/delete`, (res) => {
                    if(res.success)
                {
                    this.$store.commit('loadPosts', this.$route.path)
                }
                })
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

            if(this.post.rating == null)
                this.post.rating = 0
        }
    }
</script>

<style scoped>
    .userinfo
    {
        padding: 15px;
        font-size: 25px;
    }

    .rates span
    {
        color: rgba(0, 0, 0, 0.30)
    }

    .rates span:hover
    {
        color: rgba(0, 0, 0, 0.87);
        cursor: context-menu;
    }

    .activated-rate
    {
        color: rgba(0, 0, 0, 0.87) !important;
    }

    .info
    {
        height: 45px;
    }

    img{
        max-width: 90%;
    }
</style>
