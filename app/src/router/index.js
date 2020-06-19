import Vue from 'vue'
import Router from 'vue-router'
import Antd from 'ant-design-vue';
// import HelloWorld from '../components/HelloWorld.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Ping from '../components/Ping.vue'
import Planning from '../components/Plan/Planning.vue'
import makePlanning from '../components/Plan/Make-Planning.vue'
import 'ant-design-vue/dist/antd.css'
// import store from '../store/account'

Vue.use(Router)
Vue.use(Antd)
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
            component: Home,
            // children: [
            //     {
            //         path: 'login',
            //         name: 'Connexion',
            //         component: Login
            //     },
            //     {
            //         path: 'planning',
            //         name: 'Plannification / Planning d\'intervention',
            //         component: Planning
            //     },
            //     {
            //         path: 'make-planning',
            //         name: 'Plannification / Plannifier une intervention',
            //         component: makePlanning
            //     },
            // ]
        },
        {
            path: '/login',
            name: 'Connexion',
            component: Login,
            // beforeEnter (to, from, next) {
            //     const token = localStorage.getItem('fluance-data');
            //     const loggedIn = isValidJwt(token);
            //     // check if token valid => logo clicked => not thing turn else => turn to /
            //     if (!loggedIn) {
            //         next('/login')
            //     } else {
            //         next('/')
            //     }
            // }
        },
        {
            path: '/planning',
            name: 'Plannification / Planning d\'intervention',
            component: Planning
        },
        {
            path: '/make-planning',
            name: 'Plannification / Plannifier une intervention',
            component: makePlanning
        }
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
    }
    next()
})

export default router;