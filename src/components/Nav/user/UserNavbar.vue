<template>
    <div>
      <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Foppal</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link class="router" to="/watchteam">Teams</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link class="router" to="/watchplayer">Players</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item>
              <router-link class="router" to="/user/watchplayer"><em>Profile</em></router-link>
            </b-nav-item>

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