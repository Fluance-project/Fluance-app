import axios from 'axios';

export default class HostService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }
    get() {
        return new Promise((resolve, reject) => {
            axios.get(this.dbUrl + '/info')
           .then(function (response) {
               resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }
}