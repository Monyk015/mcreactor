import Vue from 'vue'
import LoginComponent from './LoginComponent.vue'

const jwt = require('jwt-decode')

new Vue({
    el: '#body',
    data: {
        title: 'HELLO VUE',
        user: null
    },
    components: {
        LoginComponent
    },
    created() {
        if(window.localStorage.getItem('token'))
        {
            this.user = jwt(window.localStorage.getItem('token'))
        }
    }
})
