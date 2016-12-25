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
                        console.log(this.tagId)
                        console.log(sub.Tag.id)
                        if(sub.Tag.id == this.tagId)
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
                        this.$store.commit('loadSubscriptions')
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
                        this.$store.commit('loadSubscriptions')
                    }
                    else
                    {
                        console.log('unsubscription went wrong')
                    }
                })
            }
        },
        watch:{
            '$route':'getCurrentTag'
        }
    }
</script>

<style scoped>

</style>
