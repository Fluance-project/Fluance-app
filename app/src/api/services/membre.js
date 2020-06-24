import axios from 'axios';

export default class MembreService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getAccountParent(email) {
        return new Promise((resolve, reject) => {
            axios.get(this.dbUrl + '/api/v1/account', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
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

    addUser(account_id) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + `'/api/v1/account/${account_id}/user'`, {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
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

    logout() {
        window.localStorage.removeItem('fluance-data');
    }

    persist(data) {
        window.localStorage.setItem('fluance-data', JSON.stringify({token: data.token}));
    }

    getPersisted() {
        if(window.localStorage.getItem('fluance-data')){
            return window.localStorage.getItem('fluance-data')
        } else {
            return false;
        }
    }

    persistUser(dataUser) {
        window.localStorage.setItem('user', JSON.stringify(dataUser));
    }

    getDataUser() {
        if(window.localStorage.getItem('user')){
            return window.localStorage.getItem('user')
        } else {
            return false;
        }
    }
}
