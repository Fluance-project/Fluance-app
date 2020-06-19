import axios from 'axios';

export default class AccountService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    register(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/register', {
                companyName: data.companyName,
                email: data.email,
                password: data.password,
                user: [
                    {'first name':'khac bao Anh', 'last name':'nguyen', 'title':'super saiyan', 'role':'0'}, 
                    {'first name':'myriam', 'last name':'masmoudi', 'title':'la reine des neiges', 'role':'1'}, 
                    {'first name':'wladimir', 'last name':'delenclos', 'title':'super saiyan', 'role':'0'},
                ]
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
            axios.post(this.dbUrl + '/login', {
                email: data.email,
                password: data.password
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
}
