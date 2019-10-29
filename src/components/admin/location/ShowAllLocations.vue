<template>
  <b-container>
    <h1>Location</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
        :image="image"
        :showBtns="onShowBtns"
        >
          <template v-slot:dropdown>
          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group class="text-white" label="Pick a location" style="text-align: left;">
                <b-input-group>
                  <form-select :options="locationOptions" :preselect="locationPreselect" v-on:DropDownValue="onSelectLocation"/>
                  <b-input-group-append>
                    <b-btn variant="primary" @click="$router.push('/admin/add/location')">Create new</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </template>
      </flexible-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import locationService from "@/services/location/LocationService.js";
import LocationCard from '@/components/admin/location/LocationCard';

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";

export default {

  components: { 
    FlexibleForm, 
    FormSelect 
  },

  async beforeMount() {
    await this.getLocations();
  },

  methods : {

    onSelectLocation(value) {
      this.locationPreselect = value;
      this.$router.push(`/admin/update/location/${this.locationPreselect}`);
    },

    async getLocations() {
      let locations = await locationService.findAll();
      let options = [];

      for(var i = 0; i < locations.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please select a location',
            disabled: true
          }
        }
        options[i+1] = {
          value: locations[i].locationId,
          text: locations[i].name,
          disabled: false
        }
      }
      this.locationOptions = options;

    },
  },

  data() {
    return {
      locations: [],
      image: require(`@/assets/allianz-arena-architecture-car-1103969.jpg`),
      locationPreselect: null,
      locationOptions: [],
      onShowBtns: false,

    }
  },
};
</script>

<style>
</style>