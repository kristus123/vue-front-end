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
import CreateMatch from '@/components/admin/CreateMatch';
import CreatePerson from '@/components/admin/CreatePerson';

import AdminHome from '@/views/admin/Home';
import AddPlayer from '@/components/admin/player/AddPlayer'
import AddPerson from '@/components/admin/person/AddPerson'
import DeletePerson from '@/components/admin/person/DeletePerson'

import AddAssociation from '@/components/admin/association/AddAssociation';
import AllAssociations from '@/components/admin/association/AllAssociations';

import UpdateAssociation from '@/components/admin/association/UpdateAssociation';

import AllUsers from '@/components/admin/userManagement/AllUsers';

import UpdateUser from '@/components/admin/userManagement/UpdateUser';
import CreateUser from '@/components/admin/user/CreateUser';

import UpdateLocation from '@/components/admin/location/UpdateLocation';

import UpdateAddress from '@/components/admin/address/UpdateAddress';

import AddCoach from '@/components/admin/coach/AddCoach';

import AddSeason from '@/components/season/AddSeason';


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
        {
          path: "add/person",
          component: AddPerson
        },
        {
          path: "delete/person",
          component: DeletePerson
        },
        {
          path: "add/association",
          component: AddAssociation
        },

        {
          path: "all/association",
          component: AllAssociations
        },   
        {
          path: "update/association/:id",
          component: UpdateAssociation
        },   

        {
          path: "manage/user",
          component: AllUsers
        },


        {
          path: "manage/user/:id",
          component: UpdateUser
        },

        {
          path: "create/user",
          component: CreateUser
        },

        {
          path: "update/location/:id",
          component: UpdateLocation
        },

        {
          path: "update/address/:id",
          component: UpdateAddress
        },

        {
          path     : "create/person",
          component: CreatePerson
        },

        {
          path     : "add/coach",
          component: AddCoach
        },

        {
          path     : "add/season",
          component: AddSeason
        }

      



        
        
        
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
