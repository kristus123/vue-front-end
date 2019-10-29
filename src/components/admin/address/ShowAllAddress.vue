<template>
  <b-container>
    <h1>Address</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
        :image="image"
        :color="textColor"
        :showBtns="onShowBtns"
        >
          <template v-slot:dropdown>
          <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group class="text-white" label="Pick an address" style="text-align: left;">
                <b-input-group>
                  <form-select :options="addressOptions" :preselect="addressPreselect" v-on:DropDownValue="onSelectAddress"/>
                  <b-input-group-append>
                    <b-btn variant="primary" @click="$router.push('/admin/add/address')">Create new</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </template>
      </flexible-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";
import addressService from '@/services/address/AddressService.js';


export default {
  
  components: {
    FlexibleForm,
    FormSelect
  },

  async beforeMount() {
      await this.getAddresses();
  },

  

  methods: {
    onSelectAddress(value) {
      this.addressPreselect = value;
      this.$router.push(`/admin/update/address/${this.addressPreselect}`);
    },

    async getAddresses() {
      let addresses = await addressService.getAll();
      let options = [];

      for(var i = 0; i < addresses.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick an address',
            disabled: true
          }
        }

        options[i+1] = {
          value: addresses[i].addressId,
          text: addresses[i].addresses[0] + " - " + addresses[i].city + " - " + addresses[i].country,
          disabled: false
        }
      }
      this.addressOptions = options;
    },
  },

  data() {
      return {
        addresses : [],
        image: require(`@/assets/architecture-buildings-cars-1034662.jpg`),
        textColor: 'text-white',
        onShowBtns: false,
        addressOptions: [],
        addressPreselect: null,
      }
    }
};
</script>

<style>
</style>