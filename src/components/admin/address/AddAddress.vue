<template>
  <b-container>
    <h1>Add a COACH</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import addressService from '@/services/address/AddressService';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    submitForm(value) {
        addressService.create(value);
        console.log(value); // someValue
    }
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "address",
          placeholder: "what is the address ?",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "postal code",
          placeholder: "Eg. 5059",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "City",
          placeholder: "Eg. Oslo",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Country",
          placeholder: "Eg. Sweden",
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