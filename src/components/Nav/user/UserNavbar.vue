<template>
  <div>
    <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">
      <router-link to="/user">
        <b-navbar-brand>ProFootball</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="router" to="/user/all/player">Players</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="router" to="/user/all/team">Teams</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="router" to="/user/all/match">Matches</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-nav-item v-if="$store.state.userObject.roles[0] === 'ADMINISTRATOR' ">
              <router-link class="router" to="/admin">Admin</router-link>
            </b-nav-item>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item >
              <router-link class="router" to="/">Main page</router-link>
            </b-dropdown-item>
            <b-dropdown-item >
              <router-link class="router" to="/user/my/team">Favourite Teams</router-link>
            </b-dropdown-item>
            <b-dropdown-item >
              <router-link class="router" to="/user/my/player">Favourite Players</router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>

            <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>




<script>
import authenticationService from '@/services/AuthenticationService'
export default {
  methods : {
    logout() {
      authenticationService.logout();
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>