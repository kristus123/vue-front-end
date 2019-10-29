<template>
    <div>

<!-- <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">
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

          <b-navbar-nav class="ml-auto">

            <b-nav-item>
              <router-link class="router" to="/user/watchplayer"><em>Profile</em></router-link>
            </b-nav-item>

         </b-navbar-nav>
        </b-collapse>
      </b-navbar> -->

    <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>Foppal</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="router" to="/teamsPage">Teams</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="router" to="/user/all/player">Players</router-link>
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

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">NO</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

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