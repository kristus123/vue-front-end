<template>
<div>
  <div v-if="!signedIn">
      <h2>name</h2>
      <input v-model="username" />
      <h2>password</h2>
      <input v-model="password"  type="password" />
      <hr>
      <button v-on:click="login"  type="submit">submit</button>
  </div>

  <div v-else>
      <h1>aleardy isAuthenticated</h1>
  </div>
</div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService.js';
export default {
  data() { return {
    username :"",
    password :"",
    signedIn : authenticationService.isAuthenticated()
  }},

  methods : {
    async login() {




      const cred = await authenticationService.login(this.username, this.password);

      if (cred === false) {
        //console.log(cred)
        console.log("failed")
        
      } else {
        
          this.$store.state.userObject = await  authenticationService.getUserInfo()
          console.log(this.$store.state.userObject.email);
          console.log(this.signedIn)
          this.signedIn = true;
        
      }
      this.username = "";
      this.password = ""; 
    }
  }

}
</script>

<style>

</style>