import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Ping from '../components/Ping.vue'
import Planning from '../components/Plan/Planning.vue'
import makePlanning from '../components/Plan/Make-Planning.vue'
import TaskDetail from '../components/Plan/TaskDetail.vue'
import Equipement from '../components/Equipment/Equipment.vue'
import EquipementDetail from '../components/Equipment/EquipmentDetail.vue'
import Module from '../components/Equipment/Module.vue'
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
            name: 'Tableau de bord',
            component: Home
        },
        {
            path: '/equipments',
            name: 'Équipements',
            component: Equipement,
            meta: {
                category: "Equipements"
            }
        },
        {
            path: '/equipments/:id',
            name: 'Détail de l\'équipements',
            component: EquipementDetail,
            meta: {
                category: "Equipements"
            }
        },
        {
            path: '/module',
            name: 'Modules de suivi',
            component: Module,
            meta: {
                category: "Equipements"
            }
        },
        {
            path: '/login',
            name: 'Connexion',
            component: Login,
        },
        {
            path: '/planning',
            name: "Planning d'intervention",
            component: Planning,
            meta: {
                category: "Planification"
            }
        },
        {
            path: '/planning/:id',
            name: "Detail d'intervention",
            component: TaskDetail,
            meta: {
                category: "Planification"
            }
        },
        {
            path: '/make-planning',
            name: 'Planifier une intervention',
            component: makePlanning,
            meta: {
                category: "Planification"
            }
        },
        {
            path: '/membres',
            name: 'Gestion de l\'équipe',
            component: Person,
            meta: {
                category: "Membres"
            }
        },
    ]
});
import { isValidJwt } from '../utils'
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('fluance');
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