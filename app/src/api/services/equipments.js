import axios from 'axios';

export default class AccountService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    register(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/api/v1/equipment', {
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
