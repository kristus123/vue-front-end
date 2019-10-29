<template>
  <div>
    <!-- {{association}} -->
    <generic-card>
      <h1>{{association.name}}</h1>
      <h5>{{association.description}}</h5>

      <slot />
      <!-- <b-button @click="() => deleteAssociation(association.associationId)">delete</b-button> -->
    </generic-card>
  </div>
</template>

<script>
import associationService from "@/services/association/AssociationService.js";
import GenericCard from "@/components/cards/reusables/GenericCard";
export default {
  components: { GenericCard },
  props: ["association"],
  async beforeMount() {
    this.associations = await associationService.findAll();
  },

  data() {
    return {
      associations: []
    };
  }
};
</script>

<style>
</style>