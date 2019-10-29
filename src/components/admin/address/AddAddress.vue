<template>
  <b-container>
    <h1>Add an address</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">

      <flexible-form
        :inputs="inputs"
        width="100%"
        :image="image"
        :color="textColor"
        @clicked="submitForm"
      />

        <b-row id="showSuccessMsg" class="justify-content-center">
          <b-col cols="7">
              <b-alert variant="success" show>You have successfully added an address.</b-alert>
          </b-col>
        </b-row>

        <b-row id="showErrorMsg" class="justify-content-center">
          <b-col cols="7">
              <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
          </b-col>
        </b-row>

      </b-col>
    </b-row>


  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import addressService from '@/services/address/AddressService';
import animateService from '@/services/AnimateService'

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },


  methods: {
    async submitForm(value) {
        let response = await addressService.create(value);
        if(response.status === 201) {
          this.printMsg('showSuccessMsg', true);
        } else {
          this.printMsg('showErrorMsg');
        }
    },

    printMsg(element, success) {
      document.getElementById(element).removeAttribute("hidden");
          animateService.animate(element, 'fadeInDown', null, () => {
              animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                if(success) {
                  document.getElementById(element).setAttribute("hidden", "");
                  this.$router.go(-1);
                } else {
                  document.getElementById(element).setAttribute("hidden", "");
                }
              });
          });
    }
  },

  data() {
    return {
      showSuccess : false,
      textColor: "text-white",
      image: require(`@/assets/architecture-buildings-cars-1034662.jpg`),
      inputs: [
        {
          title: "Address",
          placeholder: "Type inn the address",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Postal code",
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
          placeholder: "Eg. Norway",
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