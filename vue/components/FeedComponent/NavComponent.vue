<template>
    <div class="card">
        <div v-if="ifTagSection" class="tag-header row">
            <tag-header-component class="col s12"></tag-header-component>
        </div>
        <div class="subscriptions row collection">
            <div class="collection-item">
                Subscriptions
            </div>
            <ul>
                <li  v-for="subscription in $store.state.subscriptions">
                    <router-link class="collection-item" v-bind:to="'/post/tag/' + subscription.Tag.id">{{subscription.Tag.name}}</router-link>
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
