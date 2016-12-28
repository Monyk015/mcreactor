
<template>
    <div class="col s8">
        <template v-if="this.$store.state.user">
            <new-post-component></new-post-component>
        </template>
        <post-list-component @submitted="loadPosts"></post-list-component>
        <nav-component></nav-component>
    </div>
</template>

<script>
    import NewPostComponent from './FeedComponent/NewPostComponent.vue'
    import PostListComponent from './PostListComponent.vue'
    import NavComponent from './FeedComponent/NavComponent.vue'

    export default
    {
        components:{
            NewPostComponent,
            PostListComponent,
            NavComponent
        }
    }
</script>
