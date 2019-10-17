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
    this.locationResponse = await locationService.findById(
      this.$route.params.id
    );
    this.inputs[0].value = this.locationResponse.locationId;
    this.inputs[1].value = this.locationResponse.name;
    this.inputs[2].value = this.locationResponse.description;
  },

  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    async submitForm(value) {
      console.log(value);
      this.locationResponse = await locationService.update(value);

    }
  },

  data() {
    return {
      locationResponse: null,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "id",
          placeholder: "Select another Id",
          type: "text",
          value: "empty",
          required: true,
          disabled: true,
          icon: "fas fa-users"
        },

        {
          title: "Location name",
          placeholder: "What is the name of the location",
          type: "text",
          required: true,
          value: "empty",
          disabled: false,
          icon: "fas fa-users"
        },

        {
          title: "Desciption",
          placeholder: "Tell us a little about this place",
          type: "text",
          value: "empty",
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


