<template>
  <b-container class="loginPage">
    <b-row class="justify-content-center">
      <div id="loginForm">
        <h2 id="login-header">LOG IN</h2>
        <b-form v-on:submit.prevent="onSubmitForm">
          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group
                class="text-white"
                id="email-input-group"
                label="Username"
                label-for="email-input"
              >
                <b-input-group>
                  <b-input-group-prepend>
                    <span class="input-group-text">
                      <i class="fas fa-user"></i>
                    </span>
                  </b-input-group-prepend>
                  <b-form-input
                    id="email-input"
                    type="text"
                    v-model="username"
                    placeholder="Enter Username"
                    required
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group
                class="text-white"
                id="password-input-group"
                label="Password"
                label-for="password-input"
              >
                <b-input-group>
                  <b-input-group-prepend>
                    <span class="input-group-text">
                      <i class="fas fa-key"></i>
                    </span>
                  </b-input-group-prepend>

                  <b-form-input
                    id="password-input"
                    type="password"
                    v-model="password"
                    placeholder="Enter password"
                    required
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-alert v-if="showErrorMsg" id="errMsg" show variant="danger">{{errorMsg}}</b-alert>
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
              <b-button
                v-if="!loading"
                id="submitBtn"
                type="submit"
                variant="success"
                value="submit"
              >Login</b-button>
              <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
            </b-col>
          </b-form-row>
        </b-form>
        <div id="footer-content">
          <p>
            Don't have an account?
            <router-link to="/signup">Sign up</router-link>
          </p>
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import authenticationService from "@/services/AuthenticationService.js";
export default {
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      signedIn: authenticationService.isAuthenticated(),
      errorMsg: "Username or password is incorrect!",
      showErrorMsg: false
    };
  },

  methods: {
    async onSubmitForm() {
      this.loading = true;
      if (await this.login()) {
      } else {
        this.loading = false;
        this.showErrorMsg = true;
      }
    },

    async login() {
      const cred = await authenticationService.login(
        this.username,
        this.password
      );

      if (cred === false) {
        return false;
      } else {
        this.$store.state.userObject = await authenticationService.getUserInfo();
        console.log(this.$store.state.userObject.username);
        console.log(this.signedIn);
        this.signedIn = true;

        console.log(
          "denen burde være true " + this.$store.state.userObject.roles[0] ===
            "ADMINISTRATOR"
        );
        if (this.$store.state.userObject.roles[0] === "ADMINISTRATOR") {
          this.$router.push("/admin");
        } else this.$router.push("/user");
      }
      // this.username = "";
      // this.password = "";
    }
  }
};
</script>

<style>
.loginPage {
  margin-top: 60px;
}

#loginForm {
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

#footer-content {
  padding-top: 20px;
}

#errMsg {
  font-size: 13px;
}
</style>