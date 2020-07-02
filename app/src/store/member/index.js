import Services from '../../api/services'

const state = {
    current: {},
    members: [],
}

const actions = {
    loadMembers ({ commit }, account_id) {
        Services.member.getMembersByAccount(account_id)
        .then((members) => {
            console.log(members)
            commit('SET_MEMBERS', members)
        })
    },
    loadCurrent ({ commit }, payload) {
        Services.member.getMemberById(payload.account_id, payload.user_id)
        .then((member) => {
            commit('SET_CURRENT_MEMBER', member.user[0])
        })
    },
    deleteMember ({ commit }, data) {
        Services.member.deleteMemberById(data.account_id, data.data)
        .then(() => {
            commit('CLEAR_CURRENT_MEMBER')
        })
    },
    editEMember ({ commit }, payload) {
        console.log(payload.account_id, payload.member_id, payload.member_data)
        Services.member.editMember(payload.account_id, payload.member_id, payload.member_data)
        .then((member) => {
            commit('SET_CURRENT_MEMBER', member)
        })
    },
    addMember ({ commit }, account_id, member) {
        Services.member.addMember(account_id , member)
        .then((res) => {
            commit('ADD_MEMBER', JSON.parse(res.data.data))
        })
    },
}

const mutations = {
    SET_MEMBERS (state, members) {
        state.members = members
    },
    CLEAR_CURRENT_MEMBER (state) {
        state.current = {}
    },
    SET_CURRENT_MEMBER (state, member) {
        state.current = member
    },
    ADD_MEMBER (state, member) {
        if(state.members == undefined){
            state.members = [];
        }
        state.members.push(member)
    },
}

const getters = {
    current: state => state.current,
    members: state => state.members,
}

const member = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default member