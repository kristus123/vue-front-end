<<<<<<< HEAD
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginPage from '@/views/LoginPage'
import SignupPage from '@/views/SignupPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path : "/login",
      name : "login",
      component : LoginPage
    },
    {
      path : "/signup",
      name : "signup",
      component : SignupPage

    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
=======
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginPage from '@/views/LoginPage'
import SignupPage from '@/views/SignupPage'
import PlayerCard from '@/views/PlayerCard'
import PlayerStats from '@/views/PlayerStats'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path : "/login",
      name : "login",
      component : LoginPage
    },
    {
      path : "/signup",
      name : "signup",
      component : SignupPage

    },
    {
      path : "/playerCard",
      name : "playerCard",
      component: PlayerCard
    }, 
    {
      path : "/playerStats",
      name : "playerStats",
      component : PlayerStats
    },
  
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
>>>>>>> d06beda48410f764a23bbd5d0d865c4ae96c1713
