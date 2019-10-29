import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'




//import axiosService from '@/services/AxiosService';
import authenticationService from '@/services/AuthenticationService'
import instance from '@/services/AxiosService.js';



router.beforeEach(async (to, from, next) => {
  // console.log("HELLO")


  if (authenticationService.isAuthenticated() && await authenticationService.getUserInfo() === false ) {
    console.log("INSIDE HERER")
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`;
    next("/refresh-yourself")  
  }
  next()
})

// router.beforeEach(async (to, from, next) => {  
//   console.log(await authenticationService.getUserInfo());
//   if (true) {
//     next()
//   }
//   else next('/')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
