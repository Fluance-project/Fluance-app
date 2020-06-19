import { isValidJwt, EventBus } from '../../utils'

const state = {
    account: {},
    jwt: ''
}

const actions = {

    login(context, userData) {
        context.commit('setUserData', { userData })
        return this.$service.account
            .login(userData)
            .then(res => context.commit('setJwtToken', { jwt: res.data}))
            .catch(error => {
                console.log('Error Authenticating: ', error)
                EventBus.$emit('failedAuthentication', error)
              })
    },
    register (context, userData) {
        context.commit('setUserData', { userData })
        return this.$service.account
            .register(userData)
            .then(context.dispatch('login', userData))
            .catch(error => {
            console.log('Error Registering: ', error)
            EventBus.$emit('failedRegistering: ', error)
            })
    },

    logout () {
        
    }
}

const mutations = {
    setUserData (state, payload) {
        console.log('setUserData payload = ', payload)
        state.userData = payload.userData
    },
    setJwtToken (state, payload) {
        console.log('setJwtToken payload = ', payload)
        localStorage.token = payload.jwt.token
        state.jwt = payload.jwt
    },
    SET_USER(state, user) {
        state.user = user
    }
}

const getters = {
    isAuthenticated (state) {
        return isValidJwt(state.jwt.token)
    }
}

const account = {
    state,
    actions,
    mutations,
    getters
}

export default account