<template>
    <div class="card">
        <div v-if="ifTagSection" class="tag-header row">
            <tag-header-component class="col s12"></tag-header-component>
        </div>
        <div v-if="$store.state.user" class="subscriptions collection">
            <div class="collection-item">
                Subscriptions
            </div>
            <ul v-if="$store.state.subscriptions.length">
                <li v-for="subscription in $store.state.subscriptions">
                    <router-link class="collection-item" v-bind:to="'/post/tag/' + subscription.Tag.id">
                        {{subscription.Tag.name}}
                    </router-link>
                </li>
            </ul>
            <p class="col s12" v-else>
                So empty.
            </p>
        </div>
        <div v-if="$store.state.user" class="bans collection">
            <div class="collection-item">
                Bans
            </div>
            <ul v-if="$store.state.bans.length">
                <li v-for="ban in $store.state.bans">
                    <router-link class="collection-item" v-bind:to="'/post/tag/' + ban.Tag.id">{{ban.Tag.name}}
                    </router-link>
                </li>
            </ul>
            <p class="col s12" v-else>
                So empty.
            </p>
        </div>
        <filter-component v-if="$route.path == '/'"></filter-component>
    </div>
</template>

<script>
    import TagHeaderComponent from './NavComponent/TagHeaderComponent.vue'
    import FilterComponent from './NavComponent/FilterComponent.vue'

    export default{
        components: {
            TagHeaderComponent,
            FilterComponent
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
