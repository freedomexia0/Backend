import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import VueOnsen from 'vue-onsenui'
import store from './store'
import axios from "axios"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueOnsen)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
