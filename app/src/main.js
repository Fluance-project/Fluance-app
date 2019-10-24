import Vue from 'vue'
import Antd from 'ant-design-vue';
import VueLocalStorage from 'vue-localstorage'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import Api from './requests'

import './assets/index.css'

Vue.use(Antd);
Vue.use(VueLocalStorage)
Vue.prototype.$api = Api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
