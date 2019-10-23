<template>
  <div class="generic-card">
  <b-card>
      <slot />
  <hr>
  <router-link :to="updateUrl">
  <b-button>
    Update
  </b-button>

  </router-link>
  </b-card>
</div>
</template>

<script>
export default {
  props: ['updateUrl']

}
</script>

<style>
.generic-card {
  padding:20px;
  width: 80%;
}

</style>