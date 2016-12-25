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
