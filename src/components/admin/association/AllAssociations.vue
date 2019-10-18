<template>
  <div>
    <h1>show all associations</h1>
    <div v-for="association in associations">
      <generic-card>
        <h1>{{association.name}}</h1>
        <h3>{{association.description}}</h3>

        <router-link :to="`/admin/update/association/${5}`">
          <b-button>update</b-button>
        </router-link>

        <b-button>delete</b-button>
      </generic-card>
    </div>
  </div>
</template>

<script>
import associationService from "@/services/association/AssociationService.js";
import GenericCard from "@/components/cards/reusables/GenericCard";

export default {
  components: { GenericCard },
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