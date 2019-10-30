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
    userObject : null // {roles: ['ADMINISTRATOR'], token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZ…-QxVGTAgXYWvzxeZORI6ktbRuuauikVzdTfMODZ2yjqdcvzAQ", username: "krispetter@gmail.com"}
    // {roles: "[STANDARD]", token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzZ…SKFjSk97UE22py5aIhmdY69cdmmI35oqvUbFCX4op_B1bJ_Qw", username: "panda@panda.com"}
  },
  mutations: {

  },
  actions: {

  }
})
