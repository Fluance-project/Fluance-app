import Vue from 'vue'
import Vuex from 'vuex'

import home from './home'
import account from './account'

Vue.use(Vuex)


const store = new Vuex.Store({
    // state: {
    //     home: home.state,
    //     account: account.state,
    // },
    // actions: {
    //     ...home.actions,
    //     ...account.actions,
    // },
    // mutations: {
    //     ...home.mutations,
    //     ...account.mutations,
    // },
    // getters: {
    //     ...home.getters,
    //     ...account.getters,
    // }
    modules: {
        home: home,
        account: account
    }
})

export default store