<template>
  <b-container>
    <user-navbar />
    <div style="padding-top:20px;">

      <router-view />
    </div>
  </b-container>
</template>

<script>
import UserNavbar from "@/components/Nav/user/UserNavbar";
import authenticationService from "@/services/AuthenticationService";

export default {
  name: "UserHome",
  components: {
    UserNavbar
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