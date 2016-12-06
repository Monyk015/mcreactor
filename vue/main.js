import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import FeedComponent from './components/FeedComponent.vue'

const jwt = require('jwt-decode')

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    }
})

new Vue({    
    store,
    components: {
        LoginComponent,
        RegisterComponent,
        FeedComponent
    },
    created() {
        if (Cookies.get('token')) {
            this.$store.commit('setUser', jwt(Cookies.get('token')))
        }
    },
    methods: {
        logout() {
            this.$store.commit('setUser', null)
            Cookies.remove('token')
        }
    }
}).$mount('#body')
