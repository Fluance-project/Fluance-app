import { fetchSnapShot } from '../../api'

const state = {
    snapShot: [],
    user: {},
    jwt: '',
    route: ''
}

const actions = {
    loadSnapShot(context) {
        return fetchSnapShot()
            .then(
                (res) => context.commit(
                    'setSnapShot', 
                    { snapShot: res }
                )
            )
    },
    loadRoute(context, routeName) {
        return context.commit('setRoute', { route: routeName })
    }
}

const mutations = {
    setSnapShot(state, payload) {
        state.snapShot = payload.snapShot
    },
    setRoute(state, payload) {
        state.route = payload.route
    }
}

const getters = {
}

const home = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default home