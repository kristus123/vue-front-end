import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'

Vue.config.productionTip = false
Vue.use(VCalendar);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
