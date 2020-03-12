import Services from '../../services'

const state = {
    lastUpdate: '',
    hostData: {},
}

const getters = {
    host(state) {
        return state.hostData
    }
}

const mutations = {
    SAVE_HOST(state, hostData) {
      state.host.hostData = hostData;
      state.host.lastUpdate = Date.now();
    }
}

const actions = {
    setHost({commit}) {
        Services.host.get().then(result => {
          commit('SAVE_HOST', result.data);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    }
}


const host = {
    state,
    mutations,
    getters,
    actions,
}
export default host