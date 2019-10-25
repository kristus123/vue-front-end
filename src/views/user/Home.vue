<template>
  <b-container>
    <user-navbar />
    <user-landing-page />
  </b-container>
</template>

<script>
import UserNavbar from '@/components/Nav/user/UserNavbar';
import UserLandingPage from '@/components/user/UserLandingPage';

export default {
  name: "UserHome",
  components: {
    UserNavbar,
    UserLandingPage
  }
};
</script>

<style>
</style>