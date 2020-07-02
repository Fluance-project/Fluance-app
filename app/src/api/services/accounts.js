import axios from 'axios';

export default class AccountService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    register(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/api/v1/register', {
                companyName: data.companyName,
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

    login(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/api/v1/login', {
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
        window.localStorage.removeItem('fluance');
    }

    persist(data) {
        window.localStorage.setItem('fluance', JSON.stringify({token: data.token}));
    }

    getDataUser() {
        if(window.localStorage.getItem('user')){
            return window.localStorage.getItem('user')
        } else {
            return false;
        }
    }

    getAccount(data) {
        return new Promise((resolve, reject) => {
            axios.get(this.dbUrl + '/api/v1/account', {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.fetchToken()
            }
            }).then((res) => {
                if (res) {
                    resolve(res)
                } else {
                    reject("Account doest not exist")
                }
            })
            
        })
    }
}
