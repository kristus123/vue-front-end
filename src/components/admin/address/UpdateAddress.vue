<template>
  <b-container>
    <h1 style="color:black;">Update an address</h1>
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
import addressService from '@/services/address/AddressService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  beforeMount() {
    this.address = addressService.findById(this.$route.params.addressId);
  },

  methods: {
    submitForm(value) {
      addressService.update(value);
      console.log("____________");
      console.log(value); // someValue
    }
  },



  data() {
    return {
      address : {},
      
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Address",
          type: "text",
          required: true,
          icon: "fas fa-user"
        },
        {
          title: "Postal code",
          type: "number",
          required: "required",
          disabled: false,
          icon: "fas fa-hashtag"
        },
        {
          title: "City",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Country",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-layer-group"
        },
        
      ]
    };
  }
};
</script>

<style>
</style>