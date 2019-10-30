<template>
  <b-container>
    <h1>Add a location</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
          :inputs="inputs"
          width="100%"
          :image="image"
          :color="textColor"
          @clicked="submitForm"
        >
          <template v-slot:firstDropdown>
          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group class="text-white" label="Pick an address" style="text-align: left;">
                <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-address-card"></i></span>
                    </b-input-group-prepend>
                  <form-select :options="addressOptions" :preslecet="addressPreselect" v-on:DropDownValue="onSelectAddress"/>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </template>

        </flexible-form>

        <b-row id="showSuccessMsg" class="justify-content-center">
          <b-col cols="7">
              <b-alert variant="success" show>You have successfully added a location.</b-alert>
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
import locationService from '@/services/location/LocationService.js';
import addressService from "@/services/address/AddressService";
import FormSelect from "@/components/forms/FormSelect"
import animateService from '@/services/AnimateService'

export default {
  name: "Addplayer",
  components: {
    FlexibleForm,
    FormSelect
  },

  async beforeMount() {
    await this.getAddresses();
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },


  methods: {
      async submitForm() {

        const locationObject = {
          addressId: this.addressPreselect,
          name: this.inputs[0].value,
          description: this.inputs[1].value
        }

        let response = await locationService.createWithoutConvert(locationObject);
        if(response.status === 201) {
          this.printMsg('showSuccessMsg', true);
        } else {
          this.printMsg('showErrorMsg');
        }
    },

    onSelectAddress(value) {
      this.addressPreselect = value;
    },

    async getAddresses() {
      let addresses = await addressService.getAll();
      await this.filterAddresses(addresses);
    },

    async filterAddresses(addresses) {
      let locations = await locationService.findAll();
      let filteredOptions = [];
      let options = [];

      for(var i = 0; i < addresses.length; i++) {
        if(!locations.some(item => item.address.addressId === addresses[i].addressId)) {
          filteredOptions.push(addresses[i]);
        }
      }

      for(var i = 0; i < filteredOptions.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick an address',
            disabled: true
          }
        }
        options[i+1] = {
          value: filteredOptions[i].addressId,
          text: filteredOptions[i].addresses[0] + " - " + filteredOptions[i].city + " - " + filteredOptions[i].country,
          disabled: false
        }
      }
      this.addressOptions = options;
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
      locationResponse : null,
      textColor: "text-white",
      addressOptions: [],
      addressPreselect: null,
      image: require(`@/assets/allianz-arena-architecture-car-1103969.jpg`),
      inputs: [
        {
          title: "Name of location",
          placeholder: "Type in a name",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-file-signature"
        },
        {
          title: "Desciption",
          placeholder: "Type in a description",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-align-left"
        },
      ]
    };
  }
};
</script>

<style>
</style>