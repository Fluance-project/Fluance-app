import Vue from 'vue'

import Router from 'vue-router'
import Home from '../views/Home.vue'
import Datastories from '../views/Datastories.vue'
import NewDatastory from '../views/NewDatastory.vue'
import Boards from '../views/Boards.vue'
import NewBoard from '../views/NewBoard.vue'
import NewAnalysis from '../views/NewAnalysis.vue'
import Source from '../views/Source.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import Notification from '../views/Notification.vue'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'


import store from '../store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Connexion',
      component: Login,
      meta: {
        middleware: [
          guest
        ]
      }
    },
    {
      path: '/',
      name: 'Tableau de bord',
      component: Home,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/activities',
      name: 'Activités',
      component: Notification,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/datastories',
      name: 'Mes Datastories',
      component: Datastories,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/new-datastory',
      name: 'Nouvelle datastory',
      component: NewDatastory,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/liveboards',
      name: 'Mes moniteurs en temps réel',
      component: Boards,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/new-liveboards',
      name: 'Nouveau moniteur en temps réel',
      component: NewBoard,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/new-source',
      name: 'Sources en temps réel',
      component: Source,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/new-analysis',
      name: 'Analyser un dataset',
      component: NewAnalysis,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/settings',
      name: 'Paramètres',
      component: Settings,
      meta: {
        middleware: [
          auth
        ]
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        middleware: [
          auth
        ]
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

// router.afterEach((to, from) => {
  
// })

export default router