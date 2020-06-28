

const state = {
    snapShot: [],
    user: {},
    jwt: '',
    route: ''
}

const actions = {
    loadRoute(context, routeName) {
        return context.commit('SET_ROUTE', { route: routeName })
    },
    loadJwt(context, jwt) {
        return context.commit('SET_JWT', { jwt: jwt })
    }
}

const mutations = {
    setSnapShot(state, payload) {
        state.snapShot = payload.snapShot
    },
    SET_ROUTE(state, payload) {
        state.route = payload.route
    },
    SET_JWT(state, payload) {
        state.jwt = payload.jwt
    }
}

const getters = {
    getJwt(state){
        return state.jwt
    }
}

const app = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default app