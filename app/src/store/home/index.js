import { fetchSnapShot } from '../../api'

const state = {
    snapShot: [],
    user: {},
    jwt: ''
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
    }
}

const mutations = {
    setSnapShot(state, payload) {
        state.snapShot = payload.snapShot
    },
}

const getters = {
}

const home = {
    state,
    actions,
    mutations,
    getters
}

export default home