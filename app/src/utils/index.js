import Vue from 'vue'

export const EventBus = new Vue()

export function isValidJwt (jwt) {
    if (!jwt || jwt.split('.').length < 3) {
        return false
    } else {
        return true
    }
}

export function sparseUserFromToken (token) {
    let acc = JSON.parse(atob(token.split('.')[1]))
    const tokenInfo = {
        user: acc.user,
        exp: acc.exp,
        id: acc.id,
    }
    return tokenInfo
} 

export function authHeader() {
    let acc = JSON.parse(localStorage.getItem('fluance'));
    if (acc && acc.token) {
        return { Authorization: 'Bearer ' + acc};
    } else {
        return {};
    }
}