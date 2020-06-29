// import { isValidJwt, EventBus, sparseUserFromToken } from '../../utils'
import Services from '../../api/services'

const state = {
    operateurs: []
}

const actions = {
    loadOperateurs(context, account_id, token) {
        console.log(token)
        Services.membre.getAllUser(account_id, token)
        .then((res) => {
            console.log(res.user);
            context.commit('fetchOperateurs', {operateurs: res.user})
        })
    }
}

const mutations = {
    fetchOperateurs(state, payload) {
        state.operateurs = payload.operateurs
    }
}

const getters = {
    // operateurs: state => state.operateurs
}

const membre = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default membre;