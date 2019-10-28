<template>
    <div>
    <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Foppal</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="router" to="/teamsPage">Teams</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="router" to="/user/watchplayer">Players</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          
          <b-nav-form>
            <router-link class="router" to="/signup">
              <b-button size="sm" variant="outline-light">Signup</b-button>            
            </router-link>
            <router-link class="router" to="/login">
              <b-button size="sm" variant="outline-light">Login</b-button>
            </router-link>
          </b-nav-form>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
</template>




<script>
export default {};
</script>

<style>
</style>