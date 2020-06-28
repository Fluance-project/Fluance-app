import Services from '../../api/services'
const state = {
    equipments: [],
}

const actions = {
    loadEquipments ({ commit }, id) {
        Services.equipment.getMachinesByAccount(id)
        .then((r) => {
            console.log(r);
        })
        .then(equipements => {
            console.log(equipements);
            commit('SET_EQUIPEMENTS', equipements)
        })
      },
}

const mutations = {
    SET_EQUIPEMENTS (state, equipments) {
        state.equipments = equipments
    },
    ADD_EQUIPEMENT (state, equipmentObject) {
        state.equipments.push(equipmentObject)
      },
}

const getters = {
    newTodo: state => state.newTodo,
    equipments: state => state.equipments
}

const equipment = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default equipment