import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import VueOnsen from 'vue-onsenui'
import store from './store'
import axios from "axios"

Vue.prototype.$axios = axios;
Vue.config.productionTip = false


Vue.use(VueOnsen)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
