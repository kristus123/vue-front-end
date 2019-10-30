<template>
  <b-container> 
    <h1>Update a location</h1>
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
              <b-alert variant="success" show>You have successfully updated a loaction.</b-alert>
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
import locationService from "@/services/location/LocationService.js";
import addressService from "@/services/address/AddressService";
import FormSelect from "@/components/forms/FormSelect";
import animateService from '@/services/AnimateService'

export default {
  async beforeMount() {
    await this.getLocations();
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  components: {
    FlexibleForm,
    FormSelect
  },

  methods: {
    async submitForm() {
      const locationObject = {
        addressId: this.addressPreselect,
        name: this.inputs[0].value,
        description: this.inputs[1].value
      }
      let response = await locationService.updateWithoutConvert(locationObject, this.$route.params.id);
      if(response.status === 201) {
        this.printMsg('showSuccessMsg', true);
      } else {
        this.printMsg('showErrorMsg');
      }

    },

    async getLocation() {
      let location = await locationService.findById(this.$route.params.id);
      this.inputs[0].value = location.name;
      this.inputs[1].value = location.description;

      return location.address.addresses[0] + " - " + location.address.city + " - " + location.address.country;
    },

    async getLocations() {
      let locations = await locationService.findAll();
      this.filterAddress(locations);
    },

    async filterAddress(locations) {
      let addresses = await addressService.getAll();
      let filteredAddresses = [];
      let options = [];

      for(var i = 0; i < addresses.length; i++) {
        if(!locations.some(item => item.address.addressId === addresses[i].addressId)) {
          filteredAddresses.push(addresses[i]);
        }
      }

      for(var i = 0; i < filteredAddresses.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: await this.getLocation(),
            disabled: true
          }
        }

        options[i+1] = {
          value: filteredAddresses[i].addressId,
          text: filteredAddresses[i].addresses[0] + " - " + filteredAddresses[i].city + " - " + filteredAddresses[i].country,
          disabled: false
        }
      }

      this.addressOptions = options;

    },

    onSelectAddress(value) {
      this.addressPreselect = value;
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
      textColor: "text-white",
      image: require(`@/assets/allianz-arena-architecture-car-1103969.jpg`),
      addressOptions: [],
      addressPreselect: null,
      inputs: [
        {
          title: "Location name",
          placeholder: "What is the name of the location",
          type: "text",
          required: true,
          value: "empty",
          disabled: false,
          icon: "fas fa-file-signature"
        },

        {
          title: "Desciption",
          placeholder: "Tell us a little about this place",
          type: "text",
          value: "empty",
          required: true,
          disabled: false,
          icon: "fas fa-align-left"
        }
      ]
    };
  }
};
</script>

<style>
</style>


