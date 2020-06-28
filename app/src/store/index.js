import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import account from './account'
import equipment from './equipment'
import task from './task'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        app: app,
        account: account,
        equipment: equipment,
        task: task,
    }
})

export default store