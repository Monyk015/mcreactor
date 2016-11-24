import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import LoginComponent from './LoginComponent.vue'

const jwt = require('jwt-decode')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user)
        {
            state.user = user
        }
    }
})

new Vue({
    el: '#body',
    store,
    data: {
        title: 'HELLO VUE!'
    },
    components: {
        LoginComponent
    },
    created() {
        if(Cookies.get('token'))
        {
            this.$store.commit('setUser',jwt(Cookies.get('token')))
        }
    }
})
