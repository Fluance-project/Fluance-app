import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Ping from '../components/Ping.vue'
import Planning from '../components/Plan/Planning.vue'
import makePlanning from '../components/Plan/Make-Planning.vue'
import Equipement from '../components/Equipment/Equipment.vue'
import NewEquipement from '../components/Equipment/New-Equipment.vue'
import Person from '../components/Person.vue'

Vue.use(Router)
// const secure = true
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/ping',
            name: 'Ping',
            component: Ping
        },
        {
            path: '/',
            name: 'Tableau-de-bord',
            component: Home
        },
        {
            path: '/equipments',
            name: 'Équipements',
            component: Equipement
        },
        {
            path: '/new-equipment',
            name: 'Nouvel équipements',
            component: NewEquipement
        },
        {
            path: '/login',
            name: 'Connexion',
            component: Login
        },
        {
            path: '/planning',
            name: 'Plnnification / Planning d\'intervention',
            component: Planning
        },
        {
            path: '/make-planning',
            name: 'Plannification / Plannifier une intervention',
            component: makePlanning
        },
        {
            path: '/membres',
            name: 'Gestion de l\'équipe',
            component: Person
        },
    ]
});
import { isValidJwt } from '../utils'
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('fluance-data');
    const loggedIn = isValidJwt(token);
    if (authRequired && !loggedIn) {
        return next('/login');
    } else if (!authRequired && loggedIn && to.path == '/login') { // when go in /login while loggedin true => go to path /
        return next('/')
    } else {
        next()
    }
})

export default router;