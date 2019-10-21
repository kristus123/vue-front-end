<template>
  <b-container v-if="inputs != null">
    <h2>{{address}}</h2>

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
import addressService from "@/services/address/AddressService.js";

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  async beforeMount() {
    this.address = await addressService.findById(this.$route.params.id);

    this.inputs = [
      {
        title: "addressId",
        type: "number",
        value: this.address.addressId,
        required: "required",
        disabled: true,
        icon: "fas fa-hashtag"
      },
      {
        title: "Address",
        type: "text",
        value: this.address.addresses[0],
        required: true,
        icon: "fas fa-user"
      },
      {
        title: "Postal code",
        type: "number",
        value: this.address.postalCode,
        required: "required",
        disabled: false,
        icon: "fas fa-hashtag"
      },
      
      {
        title: "City",
        value: this.address.city,
        type: "text",
        required: true,
        disabled: false,
        icon: "fas fa-users"
      },
      {
        title: "Country",
        value: this.address.country,
        type: "text",
        required: true,
        disabled: false,
        icon: "fas fa-layer-group"
      }
    ];
  },

  methods: {
    async submitForm(value) {
      console.log("updating")
      this.address = await addressService.update(value);
    }
  },

  data() {
    return {
      address: {},
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: null
    };
  }
};
</script>

<style>
</style>