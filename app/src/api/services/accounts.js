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

    getAccount(email) {
        const allAccount = [
            {
                id: 1,
                email: "anh@gmail.com",
                companyName: "Fluance"
            },
            {
                id: 2,
                email: "baoanh@gmail.com",
                companyName: "Fluance"
            },
        ]
        return new Promise((resolve, reject) => {
            const currentAccount = allAccount.find(el => el.email == email)
            if (currentAccount) {
                resolve(currentAccount)
            } else {
                reject("No account existed !!!")
            }
        })
    }
}
