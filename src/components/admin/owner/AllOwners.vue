<template>
  <center>
      <h1>Update owners</h1>
      <hr class="pretty">
    <div v-for="owner in owners" v-bind:key="owner.ownerId">
      <b-card style="max-width:50%; margin:20px;" > 
        {{owner.person.firstName}}
        <hr />
        <router-link :to="`/admin/update/owner/${owner.ownerId}`">
          <b-button variant="primary">Edit</b-button>
        </router-link>
      </b-card>
    </div>
  </center>
</template>

<script>
import ownerService from "@/services/owner/OwnerService.js";
export default {
  async beforeMount() {
    this.owners = await ownerService.findAll();
  },
  data() {
    return {
      owners: []
    };
  }
};
</script>

<style>
</style>