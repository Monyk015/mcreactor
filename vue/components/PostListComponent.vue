
<template>
    <ul>
        <li v-if="!posts.length" class="card">So empty.</li>
        <li v-for="(post,index) in posts" class="card">
            <post-component :post="post"></post-component>
        </li>
    </ul>
</template>

<script>
    import PostComponent from './PostListComponent/PostComponent.vue'

    export default
    {
        components:{
            PostComponent
        },
        props:['posts']
    }
</script>
