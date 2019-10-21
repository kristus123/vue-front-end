<template>
  <div>
    <h2>hei</h2>
    
    <address-card />

  </div>
</template>

<script>
// import FlexibleForm from "@/components/forms/FlexibleForm";
import AddressCard from '@/components/cards/AddressCard';
import addressService from '@/services/address/AddressService.js';


export default {
  name: "Addplayer",
  
  components: {
    AddressCard
  },



  async beforeMount() {
      this.addresses = await addressService.getAll();
  },

  methods: {
    data : function() {
      return {
        addresses : []
      }
    }
  }

 
};
</script>

<style>
</style>