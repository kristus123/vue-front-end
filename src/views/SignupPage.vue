<template>
<b-container class="signupPage">
  <b-row class="justify-content-center">
  <div id="signupForm">
    <h2 id="signup-header">SIGN UP</h2>

    <b-form v-on:submit.prevent="onSubmitForm">
      <b-form-row class="justify-content-center">
        <b-col cols="8">
          <b-form-group class="text-white" id="email-input-group" label="Email address" label-for="email-input">
            <b-input-group>
                <b-input-group-prepend>
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                </b-input-group-prepend>
                <b-form-input v-model="email" :state="emailState" id="email-input" type="email" placeholder="Enter email" required></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-form-group class="text-white" id="password-input-group" label="Password" label-for="password-input" description="Minimum length 8">
          <b-input-group>
                <b-input-group-prepend>
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                </b-input-group-prepend>
          <b-form-input v-model="password" :state="passwordState" id="password-input" type="password" placeholder="Enter password" required></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-form-row>

        <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-form-group class="text-white" id="re-password-input-group" label="Re-enter password" label-for="re-password-input">
            <b-input-group>
                <b-input-group-prepend>
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                </b-input-group-prepend>
          <b-form-input v-model="rePassword" :state="rePasswordState" id="re-password-input" type="password" placeholder="Enter password again" required></b-form-input>
            </b-input-group>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-alert v-if="showErrorMsg" id="errMsg" show variant="warning">{{errorMsg}}</b-alert>
      </b-col>
    </b-form-row>

    <b-form-row class="justify-content-center">
      <b-col cols="8">
        <b-button id="submitBtn" type="submit" variant="primary" value="Submit">Signup</b-button>
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
    data() {
        return {
            showErrorMsg: false,
            errorMsg: '',
            email: '',
            password: '',
            rePassword: '',
            emailState: '-',
            rePasswordState: '-',
            passwordState: '-',
            emailReg : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        };
    },

    watch: {
        email: function() {
            this.validateEmail();
        },

        password: function() {
            this.validatePassword();
        },

        rePassword: function() {
            this.validateRePassword();
        }
    },

    methods: {
        validateEmail() {
            return (this.email == "") ? "" : (this.emailReg.test(this.email)) ? this.emailState = true : this.emailState = false;
        },

        validatePassword() {
            return this.password.length < 8 ? this.passwordState = false : this.passwordState = true;
        },

        validateRePassword() {
            if(this.password !== this.rePassword) {
                return this.rePasswordState = false;
            } else {
                return this.rePasswordState = true;
            }
        },
    }
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
}


#submitBtn {
  margin-top: 30px;
  width: 100%;
  border-radius: 50px;
}

#checkbox-group {
  padding-bottom: 30px;
}

#footer-content {
  padding-top: 20px;
}

.text-muted {
    color:white!important;
}

</style>