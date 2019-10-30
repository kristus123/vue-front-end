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
            <router-link class="router" to="/user/all/player">Players</router-link>
          </b-nav-item>

          <!-- <b-nav-item v-if="$store.state.userObject.roles[0] === 'ADMINISTRATOR' ">
            <router-link class="router" to="/admin">Go back to admin-page</router-link>
          </b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="/user">Profile</b-dropdown-item>
            <b-dropdown-item href="/user/my/team">Favourite teams</b-dropdown-item>
            <b-dropdown-item href="/user/my/player">Favourite players</b-dropdown-item>
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