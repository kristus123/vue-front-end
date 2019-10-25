<template>
  <center>
      <h1>Update owners</h1>
      <hr class="pretty">
    <div v-for="owner in owners" v-bind:key="owner.ownerId">
      <owner-card :owner="owner" />
    </div>
  </center>
</template>

<script>
import ownerService from "@/services/owner/OwnerService.js";
import OwnerCard from '@/components/admin/owner/OwnerCard'
export default {
  components : {OwnerCard},
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