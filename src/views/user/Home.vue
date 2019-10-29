<template>
  <b-container>
    <user-navbar />
    <!-- <user-landing-page /> -->
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