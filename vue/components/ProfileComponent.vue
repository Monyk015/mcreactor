<template>
    <div>
        <div class="card">
            <ul class="collection">
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
                    {{user.rating}}
                </li>
                <!--<li class="collection-item"></li>-->
            </ul>
        </div>
        <post-list-component :posts="posts"></post-list-component>
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
                posts: [],
                user: null
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
    .title{
        font-weight: 700;
    }
</style>
