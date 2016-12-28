<template>
    <div class="card">
        <div v-if="ifTagSection" class="tag-header card">
            <tag-header-component></tag-header-component>
        </div>
        <div class="subscriptions card">Subscriptions
            <ul>
                <li v-for="subscription in $store.state.subscriptions">
                    <router-link v-bind:to="'/post/tag/' + subscription.Tag.id">{{subscription.Tag.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TagHeaderComponent from './NavComponent/TagHeaderComponent.vue'

    export default{
        components:{
            TagHeaderComponent
        },
        data(){
            return {}
        },
        computed: {
            ifTagSection(){
                return this.$route.path.includes('/post/tag')
            }
        }
    }
</script>

<style scoped>
    .card
    {
        height: 100%;
    }
</style>
