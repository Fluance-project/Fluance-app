import Vue from 'vue'
import Antd from 'ant-design-vue';
import VueLocalStorage from 'vue-localstorage'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import Services from './services'

import './assets/index.css'

import 'ant-design-vue/dist/antd.css'

Vue.use(Antd);
Vue.use(VueLocalStorage)
Vue.prototype.$api = Services

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
