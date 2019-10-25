<template>
<div>
  <b-container v-if="locationResponse == null">
    <h1 style="color:black;">Add a location</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>
  <div v-else>
    {{locationResponse}}
    <b-button @click="locationResponse = null"> add new </b-button>
  </div>
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import locationService from '@/services/location/LocationService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
      async submitForm(value) {
        console.log(value)
        this.locationResponse = await locationService.create(value);
    }
  },

  data() {
    return {
      locationResponse : null,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Location name",
          placeholder: "What is the name of the location",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Address Id",
          placeholder: "Select an address linked to this location",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Desciption",
          placeholder: "Tell us a little about this place",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
      ]
    };
  }
};
</script>

<style>
</style>