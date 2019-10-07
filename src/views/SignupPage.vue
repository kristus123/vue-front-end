<template>
<b-container class="signupPage">
  <b-row class="justify-content-center">
  <div id="signupForm">
    <h2 id="signup-header">SIGN UP</h2>
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
        <b-form-group class="text-white" id="re-password-input-group" label="Re-enter password" label-for="re-password-input">
          <b-form-input id="re-password-input" type="password" placeholder="Enter password again" required></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-button id="submitBtn" type="submit" variant="primary">Signup</b-button>
      </b-col>
    </b-form-row>

  </b-form>
  <div id="footer-content">
    <p>Have an account? <router-link to="/login">Log in</router-link></p>
  </div>
  </div>
  </b-row>


</b-container>
</template>

<script>
export default {
    
}
</script>

<style>

.signupPage  {
  margin-top: 60px;
}

#signupForm {
  background-image: url("../assets/afternoon-barcelona-boca-juniors-61135.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

#signup-header {
  color: white;
  padding-top: 30px;
  padding-bottom: 30px;
}

#email-input-group #password-input-group {
  text-align: left;
}

#re-password-input-group {
    text-align: left;
    padding-bottom: 30px;
}

#submitBtn {

  width: 100%;
  border-radius: 50px;
}

#checkbox-group {
  padding-bottom: 30px;
}

#footer-content {
  padding-top: 20px;
}

</style>