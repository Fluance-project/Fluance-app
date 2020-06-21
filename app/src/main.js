import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Services from './api/services'

import './assets/fluance-theme.css'

Vue.config.productionTip = false
Vue.prototype.$service = Services
// Vue.http.header.common['Access-Control-Allow-Origin'] = '*'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
