<template>
  <div id="app">
    <div id="nav">
      <Navbar v-if="showNavbar"></Navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Nav/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      showNavbar : true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.router{
  all:unset;

}

.router:hover {
  text-decoration: none;
  color:inherit;
}
</style>
