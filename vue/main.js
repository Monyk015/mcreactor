import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import LoginComponent from './components/LoginComponent.vue'
import RegisterComponent from './components/RegisterComponent.vue'
import FeedComponent from './components/FeedComponent.vue'
import VueRouter from 'vue-router'

const jwt = require('jwt-decode')

Vue.use(Vuex)

let url = window.location.pathname

let router = null

if(url == '/')
{
    Vue.use(VueRouter)

    const routes = [
        {path: '/login'},
        {path: '/'},
        {path: '/post/tag/:id'}
    ]

    router = new VueRouter({
        routes
    })
}


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

Vue.filter('formatDate', (dateString) => {
    let date = new Date(dateString)
    const dateFormat = require('dateformat')
    return dateFormat(date, "dd.mm.yyyy HH:MM")
})

new Vue({ 
    router,
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
