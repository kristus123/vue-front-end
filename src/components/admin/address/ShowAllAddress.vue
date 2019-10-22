<template>
  <div>
    <h2>hei</h2>

        <center>
      <hr class="pretty" />

      <b-input style="max-width:40%" placeholder="Search for an address" />
      <hr class="pretty" />
    </center>
    
    <div v-for="address in addresses" v-bind:key="address.addressId">
      <address-card :address="address" />
    </div>

  </div>
</template>

<script>
// import FlexibleForm from "@/components/forms/FlexibleForm";
import AddressCard from '@/components/cards/AddressCard';
import addressService from '@/services/address/AddressService.js';


export default {
  
  components: {
    AddressCard
  },



  async beforeMount() {
      this.addresses = await addressService.getAll();
      console.log(this.addresses);
  },
  data() {
      return {
        addresses : []
      }
    }
};
</script>

<style>
</style>