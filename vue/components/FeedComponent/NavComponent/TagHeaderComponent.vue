<template>
    <div>
        <div class="tagname center-align"><h4>{{tagName}}</h4></div>
        <div class="row">
            <button @click="subscribe" v-if="$store.state.user && !ifSubscribed"
                    class="col s8 offset-s2 center-align waves-effect waves-light btn subscribe-button">Subscribe
            </button>
            <button @click="unsubscribe" v-if="$store.state.user && ifSubscribed"
                    class="col s8 offset-s2 center-align waves-effect red btn subscribe-button">Unsubscribe
            </button>
            <button @click="ban" v-if="$store.state.user && !ifBanned"
                    class="col s8 offset-s2 center-align waves-effect red btn subscribe-button">Ban
            </button>
            <button @click="unban" v-if="$store.state.user && ifBanned"
                    class="col s8 offset-s2 center-align waves-effect wawes-light btn subscribe-button">Unban
            </button>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                tagId: null,
                tagName: ''
            }
        },
        created(){
            this.getCurrentTag()
        },
        computed: {
            ifSubscribed() {
                if(this.$store.state.subscriptions)
                {
                    return this.$store.state.subscriptions.some((sub) => {
                        if(sub.Tag.id == this.tagId)
                        {
                            return true
                        }
                    })
                }
                return false
            },
            ifBanned() {
                if(this.$store.state.subscriptions)
                {
                    return this.$store.state.bans.some((ban) => {
                        if(ban.Tag.id == this.tagId)
                        {
                            return true
                        }
                    })
                }
                return false
            }
        },
        methods: {
            getCurrentTag(){
                this.tagId = this.$route.path.split('/')[3]
                $.get(`/tag/${this.tagId}`, (res) => {
                    if(res.success)
                    {
                        this.tagName = res.tagName
                    }
                })
            },
            subscribe(){
                $.get(`/user/${this.$store.state.user.id}/tag/${this.tagId}/subscribe`, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('loadSubscriptionsAndBans')
                    }
                    else
                    {
                        console.log('subscription went wrong')
                    }
                })
            },
            unsubscribe(){
                $.get(`/user/${this.$store.state.user.id}/tag/${this.tagId}/unsubscribe`, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('loadSubscriptionsAndBans')
                    }
                    else
                    {
                        console.log('unsubscription went wrong')
                    }
                })
            },
            ban(){
                $.get(`/user/${this.$store.state.user.id}/tag/${this.tagId}/ban`, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('loadSubscriptionsAndBans')
                    }
                    else
                    {
                        console.log('unsubscription went wrong')
                    }
                })
            },
            unban(){
                $.get(`/user/${this.$store.state.user.id}/tag/${this.tagId}/unban`, (res) => {
                    if(res.success)
                    {
                        this.$store.commit('loadSubscriptionsAndBans')
                    }
                    else
                    {
                        console.log('unsubscription went wrong')
                    }
                })
            }
        },
        watch: {
            '$route': 'getCurrentTag'
        }
    }
</script>

<style scoped>
    button{
        margin-top: 15px;
    }
</style>
