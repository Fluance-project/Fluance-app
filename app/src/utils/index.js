import Vue from 'vue'

export const EventBus = new Vue()

export function isValidJwt (jwt) {
    if (!jwt || jwt.split('.').length < 3) {
        return false
    } else {
        return true
    }
    // const data = JSON.parse(atob(jwt.split('.')[1]))
    // const exp = new Date(data.exp * 1000) // one minute
    // const now = new Date()
    // return now < exp
}

export function authHeader() {
    let acc = JSON.parse(localStorage.getItem('fluance-data'));
    if (acc && acc.token) {
        return { Authorization: 'Bearer ' + acc.token};
    } else {
        return {};
    }
}