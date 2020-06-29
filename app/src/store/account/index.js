import { isValidJwt, EventBus, sparseUserFromToken } from '../../utils'
import Services from '../../api/services'

const state = {
    user: '',
    exp: '',
    id: '',
    userData: {}
}

const actions = {

    login(context, userData) {

        return Services.account
            .login(userData)
            .then(res => context.commit('SET_JWT_TOKEN', { jwt: res.data}))
            .catch(error => {
                console.log('Error Authenticating: ', error)
                EventBus.$emit('failedAuthentication', error)
              })
    },
    register (context, userData) {
        context.commit('SET_USER_DATA', { userData })
        return Services.account
            .register(userData)
            .then(context.dispatch('login', userData))
            .catch(error => {
            console.log('Error Registering: ', error)
            EventBus.$emit('failedRegistering: ', error)
            })
    },

    logout () {
        
    },
    loadUser(context, token) {
        context.commit('SET_USER', {token: token})
    }
}

const mutations = {
    SET_USER_DATA (state, payload) {
        state.userData = payload.userData
    },
    SET_JWT_TOKEN (state, payload) {
        state.token = payload.jwt.token
        state.user = payload.jwt.user
    },
    SET_USER (state, payload) {
        const tokenInfo = sparseUserFromToken(payload.token)
        state.user = tokenInfo.user
        state.exp = tokenInfo.exp
        state.id = tokenInfo.id
    },
    SET_TOKEN (state, payload) {
        state.token = payload.token
    },
}

const getters = {
    isAuthenticated (state) {
        return isValidJwt(state.token)
    },
    accountId (state) {
        return state.id
    }
}

const account = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default account