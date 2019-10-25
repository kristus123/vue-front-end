<template>
  <div>
    <center>
      <h1>show all associations</h1>
      <router-link to="/admin/add/association">
        <b-button variant="outline-primary">create new!</b-button>
      </router-link>

      <div v-for="association in associations" v-bind:key="association.associationId">
        <list-of-all-associations :association="association">
          <router-link :to="`/admin/update/association/${association.associationId}`">
            <b-button variant="outline-primary">update</b-button>
          </router-link>
        </list-of-all-associations>
      </div>
    </center>
  </div>
</template>

<script>
import associationService from "@/services/association/AssociationService.js";
import GenericCard from "@/components/cards/reusables/GenericCard";
import ListOfAllAssociations from "@/components/admin/association/ListOfAllAssociations";

export default {
  components: { GenericCard, ListOfAllAssociations },

  methods: {
    deleteAssociation(id) {
      associationService.deleteAssociation(id);
    }
  },

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