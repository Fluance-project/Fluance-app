import axios from 'axios';


export default class UserService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    register(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/register', {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.email,
                termsAccepted: data.terms
            }, {headers: { Authorization: `Bearer 67890°` }})
           .then(function (response) {
               resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }

    login(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/login', {
                email: data.email,
                password: data.email,
            })
           .then(function (response) {
               resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }

    persist(data) {
        window.localStorage.setItem('ritmic-data', JSON.stringify({token: data.token, usr: data.user}));
    }

    getPersisted() {
        if(window.localStorage.getItem('ritmic-data')){
            return window.localStorage.getItem('ritmic-data')
        } else {
            return false;
        }
    }
}