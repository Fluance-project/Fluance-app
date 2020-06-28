import axios from 'axios';
import utils from '../utils';
export default class EquipmentService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getMachinesByAccount(id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/machine/by-account/'+ id;
            axios.get(path, {
                headers: {
                  'Content-Type': 'applciation/json',
                  'Authorization': utils.fetchToken()
                }
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
}
