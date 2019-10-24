import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            userData: {},
            token: ''
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },
    getters: {
        auth(state) {
            return state.user
        }
    }
})