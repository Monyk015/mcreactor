<template>
    <post-list-component></post-list-component>
    <div>ZALUPA</div>
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
