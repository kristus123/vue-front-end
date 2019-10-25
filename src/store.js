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
    userObject : null
  },
  mutations: {

  },
  actions: {

  }
})
