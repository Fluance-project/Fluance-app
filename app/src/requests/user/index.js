import axios from 'axios';


export default class UserApi {
    constructor(context) {
        this.dbUrl = context.url;
    }

    register(data) {
        return new Promise((resolve, reject) => {
            axios.post(this.dbUrl + '/register', {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.email,
                termsAccepted: data.terms
            })
           .then(function (response) {
               resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }

    login(data) {
         // eslint-disable-next-line
        console.log(data)
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
}