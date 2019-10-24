<template>
  <center>
    <div>
      <h1>All locations</h1>
      <div v-for="location in locations" v-bind:key="location.locationId">
        <generic-card :updateUrl="`/admin/update/location/${location.locationId}`">
          <h3>{{location.name}}</h3>
          <hr class="pretty" />
          <h5>"{{location.description}}"</h5>
        </generic-card>
      </div>
    </div>
  </center>
</template>

<script>
import locationService from "@/services/location/LocationService.js";
import GenericCard from "@/components/cards/reusables/GenericCard";
export default {
  components: { GenericCard },
  async beforeMount() {
    this.locations = await locationService.findAll();
  },

  data: function() {
    return {
      locations: []
    };
  },
  methods: {}
};
</script>

<style>
</style>