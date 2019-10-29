<template>
  <div>
    <h1>hello there</h1>
    <b-button @click="refresh">click here to refresh things and thangs</b-button>
    <hr class="pretty">
    <b-button @click="logout">log out</b-button>
  </div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService';
export default {
    methods: {
        async refresh() {
            this.$store.state.userObject = await authenticationService.getUserInfo()
            if (localStorage.getItem("ROLE") === "ADMINISTRATOR") {
                this.$router.push("/admin")
            } else {
                this.$router.push("/")
            }
        },
        logout() {
            localStorage.setItem("ROLE", null)
            localStorage.setItem("user-token", null)
            this.$router.push("/")
        }
    }
};
</script>

<style>
</style>