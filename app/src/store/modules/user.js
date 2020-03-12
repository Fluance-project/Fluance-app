// Store User 

const state = {
    loggedIn: false,
    userData: {},
    token: ''
}

const mutations = {
    SET_USER(state, user) {
        state.user = user
    }
}

const getters = {
    auth(state) {
        return state.user
    }
}


const user = {
    state,
    mutations,
    getters,
}
export default user