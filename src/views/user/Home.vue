<template>
  <b-container >
    <user-navbar style="position:absolute; left: 0; width:100%;"/>

    <div style="padding-top:70px;">
    <router-view />
    </div>
    <!-- <h1>{{$store.state.userObject.username}}</h1> -->
  </b-container>
</template>

<script>
import UserNavbar from "@/components/Nav/user/UserNavbar";
import UserLandingPage from "@/components/user/UserLandingPage";
import authenticationService from "@/services/AuthenticationService";

export default {
  name: "UserHome",
  components: {
    UserNavbar,
    UserLandingPage
  },
  async beforeMount() {
    this.me = await authenticationService.getUserInfo();
  },
  data() {
    return {
      me: null
    };
  }
};
</script>

<style>
</style>