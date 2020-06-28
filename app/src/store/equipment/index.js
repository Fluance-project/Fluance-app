import Services from '../../api/services'
const state = {
    current: {},
    equipments: [],
}

const actions = {
    loadEquipments ({ commit }, id) {
        Services.equipment.getMachinesByAccount(id)
        .then((equipements) => {
            commit('SET_EQUIPEMENTS', equipements)
        })
    },
    loadCurrent ({ commit }, id) {
        Services.equipment.getMachineById(id)
        .then((equipement) => {
            commit('SET_CURRENT', equipement)
        })
    },
    deleteEquipment ({ commit }, id) {
        Services.equipment.deleteMachineById(id)
        .then(() => {
            commit('CLEAR_CURRENT')
        })
    },
    editEquipments ({ commit }, equipement) {
        Services.equipment.editMachine(equipement)
        .then((equipement) => {
            commit('SET_CURRENT', equipement)
        })
    },
    addEquipments ({ commit }, equipement) {
        Services.equipment.addMachine(equipement)
        .then((equipement) => {
            commit('ADD_EQUIPEMENT', equipement)
        })
    },
}

const mutations = {
    SET_EQUIPEMENTS (state, equipments) {
        state.equipments = equipments
    },
    CLEAR_CURRENT (state) {
        state.current = {}
    },
    SET_CURRENT (state, equipment) {
        state.current = equipment
    },
    ADD_EQUIPEMENT (state, equipmentObject) {
        state.equipments.push(equipmentObject)
    },
}

const getters = {
    current: state => state.current,
    equipments: state => state.equipments,
}

const equipment = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default equipment