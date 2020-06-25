import axios from 'axios';
import AccountService from 'accounts.js';

export default class MembreService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getAccountParent(email) {
        accId = new AccountService().getAccount(email)
        return new Promise((resolve, reject) => {
            axios.get(this.dbUrl + `'/api/v1/account/${accId.id}'`, {
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
}
