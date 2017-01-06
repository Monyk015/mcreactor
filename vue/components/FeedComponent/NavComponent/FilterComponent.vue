<template>
    <div class="collection">
        <div class="collection-item">Filter</div>
        <form @submit.prevent="submit" class="collection-item row">
            <div class="collection-item row">
                <div class="input-field">
                    <input id="tags" type="text" name="tags" v-model="tags"/>
                    <label for="tags">Tags</label>
                </div>
                <div class="input-field">
                    <input id="content" type="text" name="content" v-model="content"/>
                    <label for="content">Content</label>
                </div>
            </div>
            <div class="collection-item row">
                <div class="input-field">
                    <input id="ratingFrom" v-model="ratingFrom" name="ratingFrom" type="number">
                    <label for="ratingFrom">Rating From</label>
                </div>
                <div class="input-field">
                    <input id="ratingTo" v-model="ratingTo" name="ratingTo" type="number">
                    <label for="ratingTo">Rating To</label>
                </div>
            </div>
            <div class="collection-item row">
                <div class="input-field">
                    <input id="dateFrom" v-model="dateFrom" name="dateFrom" type="date" class="datepicker">
                    <label for="dateFrom">Date From</label>
                </div>
                <div class="input-field">
                    <input id="dateTo" v-model="dateTo" name="dateTo" type="date" class="datepicker">
                    <label for="dateTo">Date To</label>
                </div>
            </div>
            <div class="center-align collection-item">
                <button id="submit-post" type="submit" name="action" class="btn waves-effect waves-light">
                    Apply
                </button>
                <button @click="reset" id="reset-filters"  class="btn waves-effect waves-light">
                    Reset
                </button>
            </div>
        </form>
    </div>
</template>

<script>

    export default{
        data(){
            return {
                tagsArray: [],
                content:'',
                ratingFrom:'',
                ratingTo:''
            }
        },
        methods: {
            submit(){
                let data = this.$data
                data.dateFrom = $('#dateFrom').val()
                data.dateTo = $('#dateTo').val()
                this.$store.commit('loadPostsWithFilter', data)
            },
            reset(){
                this.tagsArray = []
                this.content = ''
                this.ratingFrom = ''
                this.ratingTo = ''
                $('#dateFrom').trigger('reset')
                $('#dateTo').trigger('reset')
                this.$store.commit('loadPosts', this.$route.path)
            }
        },
        computed: {
            tags: {
                get(){
                    return this.tagsArray.join(',')
                },
                set(tags){
                    this.tagsArray = tags.split(',')
                }
            }
        },
        mounted(){
            $('.datepicker').pickadate({
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15 // Creates a dropdown of 15 years to control year
            })
        }
    }
</script>

<style scoped>
    .card
    {
        height: 100%;
    }
</style>