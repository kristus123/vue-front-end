<template>
<b-container class="loginPage">
  <b-form>
    <b-form-row class="justify-content-center">
      <b-form-group id="email-input-group" label="Email address:" label-for="email-input">
        <b-form-input id="email-input" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-form-group id="password-input-group" label="Enter password:" label-for="password-input">
        <b-form-input id="password-input" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
    </b-form-row>
    <b-button type="submit" variant="primary">Login</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</b-container>
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

.loginPage  {
  margin-top: 60px;
}

</style>