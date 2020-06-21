import { isValidJwt, EventBus, sparseUserFromToken } from '../../utils'
import Services from '../../api/services'

const state = {
    user: '',
    token: '',
    exp: '',
    userData: {}
}

const actions = {

    login(context, userData) {
        context.commit('setUserData', { userData })
        return Services.account
            .login(userData)
            .then(res => context.commit('setJwtToken', { jwt: res.data}))
            .catch(error => {
                console.log('Error Authenticating: ', error)
                EventBus.$emit('failedAuthentication', error)
              })
    },
    register (context, userData) {
        context.commit('setUserData', { userData })
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

    token(context, token) {
        context.commit('setToken', {token: token})
        context.commit('setUser', {token: token})
    }
}

const mutations = {
    setUserData (state, payload) {
        console.log('setUserData payload = ', payload)
        state.userData = payload.userData
    },
    setJwtToken (state, payload) {
        console.log('setJwtToken payload = ', payload)
        // localStorage.token = payload.jwt.token
        state.token = payload.jwt.token
        state.user = payload.jwt.user
    },
    // SET_USER(state, user) {
    //     state.user = user
    // },
    setToken (state, payload) {
        // console.log("token = ", payload)
        state.token = payload.token
    },
    setUser (state, payload) {
        const tokenInfo = sparseUserFromToken(payload.token)
        state.user = tokenInfo.user
        state.exp = tokenInfo.exp
        // console.log("token info = ", tokenInfo)
    }
}

const getters = {
    isAuthenticated (state) {
        return isValidJwt(state.jwt.token)
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