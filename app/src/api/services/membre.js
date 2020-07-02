import axios from 'axios';
import utils from '../utils';

export default class MemberService {
    constructor(context) {
        this.dbUrl = `${context.server_uri}:${context.server_port}`;
    }

    getMembersByAccount(id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/account/'+ id;
            console.log(utils.fetchToken())
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken()
                },
            })
            .then((res) => {
                resolve(res.data.user);
            })
            .catch((error) => {
                reject(error);
                console.error(error);
            });
        })
    }

    getMemberById(account_id, member_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/account/'+ account_id + '/user/' + member_id;
            axios({
                url: path,
                method: 'get',
                headers: {
                  'Authorization': utils.fetchToken()
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    deleteMemberById (account_id, user_id) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/account/'+ account_id + '/user/' + user_id;
            axios.delete(path,
            {
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    addMember(data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/account/'+ data.account_id + '/user';
            axios({
                url: path,
                method: 'post',
                data: data,
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                resolve(res, data);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    editMember(account_id, user_id, member_data) {
        return new Promise((resolve, reject) => {
            const path = this.dbUrl + '/api/v1/account/'+ account_id + '/user/' + user_id;
            axios({
                url: path,
                method: 'put',
                data: member_data,
                headers: {
                  'Authorization': utils.fetchToken(),
                  'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                reject(error);
            });
        })
    }
}
