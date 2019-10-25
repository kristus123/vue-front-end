<template>
  <center>
    <div>
      <h1>All locations</h1>
      <div v-for="location in locations" v-bind:key="location.locationId">
        <location-card :location="location" />
      </div>
    </div>
  </center>
</template>

<script>
import locationService from "@/services/location/LocationService.js";
import LocationCard from '@/components/admin/location/LocationCard';
export default {
  components: { LocationCard },
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