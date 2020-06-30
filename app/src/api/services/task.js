import axios from 'axios';
import utils from '../utils';

export default class TaskService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getTasksByAccount(account_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/by-account/'+ account_id;
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            });
        })
    }

    getTasksByMachine(machine_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/by-machine/'+ machine_id;
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            });
        })
    }

    getTask(task_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id;
            axios({
                url: path,
                method: 'get',
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    addTask(task_data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task';
            axios({
                url: path,
                method: 'post',
                data: task_data,
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res, task_data);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    editTask(task_id, data_update) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id;
            axios({
                url: path,
                method: 'patch',
                data: data_update,
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    deleteTask(task_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id;
            axios({
                url: path,
                method: 'delete',
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    getComment(task_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id + '/comment';
            axios({
                url: path,
                method: 'get',
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    addComment(task_id, comment_data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id + '/comment';
            axios({
                url: path,
                method: 'post',
                data: comment_data,
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    editComment(task_id, comment_id, comment_data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id + '/comment/' + comment_id;
            axios({
                url: path,
                method: 'patch',
                data: comment_data,
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }

    deleteComment(task_id, comment_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/task/' + task_id + '/comment/' + comment_id;
            axios({
                url: path,
                method: 'delete',
                headers: {
                    'Authorization': utils.fetchToken(),
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
                console.log(error);
            })
        })
    }
}