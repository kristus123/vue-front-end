import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginPage from '@/views/LoginPage'
import SignupPage from '@/views/SignupPage'
import TeamsPage from '@/views/TeamsPage'
import TeamPage from '@/views/TeamPage'

import PlayerCard  from '@/views/players/PlayerCard'
import PlayerStats from '@/views/players/PlayerStats'

import FlexibleForm from '@/components/forms/FlexibleForm';
import AddTeam from '@/components/userPanelComponents/AddTeam';
import UserPanel from '@/views/players/userpanel/UserPanel';

import AdminHome from '@/views/admin/Home';
import AddPlayer from '@/components/admin/player/AddPlayer'

import CreatePerson from '@/components/admin/CreatePerson';
import CreateMatch from '@/components/admin/CreateMatch'

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
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage

    },

    {
      path: "/player",
      name: "player",
      children: [
        {
          path: "playerCard",
          component: PlayerCard
        },
        {
          path     : "playerStats",
          component: PlayerStats
        },
        
      ]
    },
    {
      path: "/UserPanel",
      name: "UserPanel",
      component: UserPanel,
      children : [
        {
          path     : "AddTeam",
          component: AddTeam
        },
        {
          path     : "createMatch",
          component: CreateMatch
        },
        {
          path     : "CreatePerson",
          component: CreatePerson
        }

        
        
      ]
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminHome,
      children: [
        {
          path: "add/player",
          component: AddPlayer
        },
      ]
    },

    {
      path: "/testForm",
      name: "testForm",
      component: FlexibleForm
    },

    {
      path : "/teamsPage",
      name : "teamsPage",
      component : TeamsPage
    },
    {
      path : "/teamPage",
      name : "teamPage",
      component : TeamPage,
      props: true
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
