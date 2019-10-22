<template>
<div>
  <b-container v-if="locationResponse == null">
    <h1 style="color:black;">Add contact-information</h1>
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
import contactService from '@/services/contact/ContactService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
      async submitForm(value) {
        console.log(value)
        contactService(value)
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
          title: "Person",
          placeholder: "personId",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Contact type",
          placeholder: "email, phone, etc",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "details",
          placeholder: "+47 484848",
          type: "text"      ,
          required: true    ,
          disabled: false   ,
          icon: "fas fa-users"
        },
      ]
    };
  }
};
</script>

<style>
</style>