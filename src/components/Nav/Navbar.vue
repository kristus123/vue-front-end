<template>
  <div v-if="false">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Foppal</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link class="router" to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="router" to="/about">About</router-link>
          </b-nav-item>
<!-- 
          <div v-if="this.$store.state.userObject.roles[0] === 'STANDARD'">
            <b-nav-item>
              <router-link to="/STANDARD">STANDARD</router-link>
            </b-nav-item>
          </div>

          <div v-if="this.$store.state.userObject.roles[0] === 'ADMINISTRATOR'">
            <b-nav-item>
              <router-link to="/ADMIN">ADMIN</router-link>
            </b-nav-item>
          </div> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
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
export default {
  
};
</script>

<style>
a {
  color: rgba(255, 255, 255, 0.5);
}
</style>