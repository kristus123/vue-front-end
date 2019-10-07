<template>
<b-container class="loginPage">
  <b-row class="justify-content-center">
  <div class="loginForm">
    <h2 id="login-header">LOG IN</h2>
    <b-form>

      <b-form-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group class="text-white" id="email-input-group" label="Email address" label-for="email-input">
            <b-form-input id="email-input" type="email" placeholder="Enter email" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-form-group class="text-white" id="password-input-group" label="Password" label-for="password-input">
          <b-form-input id="password-input" type="password" placeholder="Enter password" required></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
      <b-form-group id="remember-checkbox-group">
        <b-form-checkbox-group id="checkbox-group">
          <b-form-checkbox class="text-white">Remember me</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-button id="submitBtn" type="submit" variant="success">Login</b-button>
      </b-col>
    </b-form-row>

  </b-form>
  <div class="footer-content">
    <p>Don't have an account? <router-link to="/singup">Sign up</router-link></p>
  </div>
  </div>
  </b-row>


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

.loginForm {
  background-image: url("../assets/field-game-grass-104675.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

#login-header {
  color: white;
  padding-top: 30px;
  padding-bottom: 30px;
}

#email-input-group {
  text-align: left;
}

#password-input-group {
  text-align: left;
}

#submitBtn {

  width: 100%;
  border-radius: 50px;
}

#checkbox-group {
  padding-bottom: 30px;
}

.footer-content {
  padding-top: 20px;
}

</style>