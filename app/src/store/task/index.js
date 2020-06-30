import Services from '../../api/services';

const state = {
    tasksByMachine: [],
    tasksByAccount: [],
    tasks: [],
    currentTask: {}
}

const actions = {
    loadTasksByAccount ({commit}, account_id) {
        Services.task.getTasksByAccount(account_id)
        .then((tasks) => {
            console.log(tasks);
            commit('SET_TASKS_BY_ACCOUNT', tasks)
        })
    },
    loadTasksByMachine ({commit}, machine_id) {
        Services.task.getTasksByMachine(machine_id)
        .then((tasks) => {
            console.log(tasks);
            commit('SET_TASKS_BY_MACHINE', tasks)
        })
    },
    loadTasks ({commit}) {
        commit('SET_TASKS')
    },
    deleteTask ({commit}, task_id) {
        Services.task.deleteTask(task_id)
        .then(() => {
            commit('DELETE_TASK', task_id)
        })
    },
    addTask ({commit}, payload) {
        Services.task.addTask(payload.task_data)
        .then((res) => {
            console.log(res.id.$oid)
            const task_id = res.id.$oid
            Services.task.getTask(task_id)
            .then((current_task_data) => {
                commit('SET_CURRENT_TASK', current_task_data)
            })
            .catch((error) => {
                console.log(error)
            })
        })
    },
    getTask ({commit}, task_id) {
        Services.task.getTask(task_id)
        .then((task) => {
            commit('SET_CURRENT_TASK', task)
        })
    }
    
}

const mutations = {
    SET_TASKS_BY_ACCOUNT (state, tasks) {
        state.tasksByAccount = tasks
    },
    SET_TASKS_BY_MACHINE (state, tasks) {
        state.tasksByMachine = tasks
    },
    SET_TASKS (state) {
        state.tasks = [...new Set([...state.tasksByMachine,
                                   ...state.tasksByAccount])]
    },
    ADD_TASKS (state, task) {
        if (state.tasks == undefined) {
            state.tasks = [];
        }
        state.tasks.push(task);
    },
    DELETE_TASK (state, task_id) {
        state.tasks = state.tasks.filter(
            el => el["_id"]["$oid"] === task_id
        )
    },
    SET_CURRENT_TASK (state, task) {
        state.currentTask = task
    }
}

const getters = {
    tasksByMachine: state => state.tasksByMachine,
    tasksByAccount: state => state.tasksByAccount,
    tasks: state => state.tasks,
    currentTask: state => state.currentTask
}

const task = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

export default task