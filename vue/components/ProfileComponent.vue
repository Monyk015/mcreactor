<template>
    <div>
        <div class="card">
            <div class="card-content">
                <span class="card-title">
                    Nickname: {{user.nickname}}
                </span>
                <ul v-if="user" class="collection">
                    <li class="collection-item">
                        <div class="title">
                            Email
                        </div>
                        {{user.email}}
                    </li>
                    <li class="collection-item">
                        <div class="title">
                            Nickname
                        </div>
                        {{user.nickname}}
                    </li>
                    <li class="collection-item">
                        <div class="title">
                            Rating
                        </div>
                        {{user.rating ? user.rating : 0}}
                    </li>
                    <!--<li class="collection-item"></li>-->
                </ul>
            </div>
            <div v-if="$store.state.user.isAdmin && !user.isBanned" class="card-action admin-actions">
                <a @click="ban">Ban user</a>
            </div>
            <div v-if="$store.state.user.isAdmin && user.isBanned" class="card-action admin-actions">
                <a @click="unban">Unban user</a>
            </div>
        </div>
        <post-list-component></post-list-component>
    </div>
</template>

<script>
    import PostListComponent from './PostListComponent.vue'

    export default
    {
        components: {
            PostListComponent
        },
        data() {
            return {
                user: {}
            }
        },
        created(){
            this.getUser()
        },
        methods:{
            getUser(){
                let path = this.$route.path
                let userId = path.split('/')[2]
                $.get(`/user/${userId}`, (res) => {
                    this.user = res
                })
                this.$store.commit('loadPosts', this.$route.path)
            },
            ban(){
                $.get('/user/' + this.user.id + '/ban', (res) => {
                    if(res.success)
                    {
                        this.getUser()
                    }
                })
            },
            unban(){
                $.get('/user/' + this.user.id + '/unban', (res) => {
                    if(res.success)
                    {
                        this.getUser()
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .title{
        font-weight: 700;
    }
</style>
