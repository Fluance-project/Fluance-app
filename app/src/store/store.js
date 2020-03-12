import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import user from './modules/user';
import host from './modules/host';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    state: {
        user: user.state,
        host: host.state,
    },
    mutations: {
       ...user.mutations,
       ...host.mutations,
    },
    getters: {
        ...user.getters,
        ...host.getters,
    },
    actions: {
        ...host.actions,
    }
})