import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    team : {
      association : null,
      coach       : null,
      owner       : null,
      location    : null
    },
    userObject : {roles: ['ADMINISTRATOR'], token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZ…-QxVGTAgXYWvzxeZORI6ktbRuuauikVzdTfMODZ2yjqdcvzAQ", username: "krispetter@gmail.com"}
  },
  mutations: {

  },
  actions: {

  }
})
