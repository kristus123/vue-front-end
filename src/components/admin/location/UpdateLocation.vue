<template>
  <div>
    <h3>{{ this.locationResponse }}</h3>
    
    <h3>{{ this.locationResponse != null }}</h3>
    
    <b-container>
      <h1 style="color:black;">uPDATE a location</h1>
      <flexible-form
        :inputs="inputs"
        width="100%"
        :image="image"
        :color="textColor"
        @clicked="submitForm"
      />
    </b-container>
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import locationService from "@/services/location/LocationService.js";

export default {
  async beforeMount() {
    this.locationResponse = await locationService.findById(this.$route.params.id);
    
  },

  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    submitForm(value) {
        console.log(value)
    }
  },

  data() {
    return {
      locationResponse: null,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
      {
        title: "Location name",
        placeholder: "What is the name of the location",
        type: "text",
        required: true,
        value: this.locationResponse != null ? this.locationResponse.name : "null"  ,
        disabled: false,
        icon: "fas fa-users"
      },
      {
        title: "Address Id",
        placeholder: "Select another Id",
        type: "number",
        value: this.locationResponse != null ? this.locationResponse.address : "null",
        required: true,
        disabled: false,
        icon: "fas fa-users"
      },
      {
        title: "Desciption",
        placeholder: "Tell us a little about this place",
        type: "number",
        value: this.locationResponse != null ? this.locationResponse.description : "null",
        required: true,
        disabled: false,
        icon: "fas fa-users"
      }
    ]
    };
  }
};
</script>

<style>
</style>


