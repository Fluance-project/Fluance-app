import axios from 'axios';
import utils from '../utils';

export default class EquipmentService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getMachinesByAccount(id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/machine/by-account/'+ id;
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken()
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

    getMachineById(id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/machine/'+ id;
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken()
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    deleteMachineById(id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/machine/'+ id;
            axios.delete(path,
            {
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    addMachine(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/api/v1/machine', {
                name: data.name,
                status: data.status,
                account_id: data.account_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': utils.fetchToken()
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    editMachine(data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/machine/'+ data.id;
            axios({
                url: path,
                method: 'put',
                data: data,
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }
}
