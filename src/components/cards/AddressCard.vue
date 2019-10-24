<template>
  <div v-if="show">


    <!-- overlay img-src="https://picsum.photos/900/250/?image=3" -->
    <b-card class="overflow-hidden" style="max-width: 300px;">
      <b-row no-gutters>
        <!-- <b-col md="6"> -->
        <b-card-body>
          <!-- <h1>hei</h1> -->
          <ul>
            <li>{{address.addresses[0]}}</li>
            <li>{{address.postalCode}} </li>
            <li>{{address.city}}</li>
            <li>{{address.country}}</li>

            <hr />
            <router-link :to="`/admin/update/address/${address.addressId}`">
              <b-button style="margin:10px;" variant="primary">Update</b-button>
            </router-link>
            <br />
            <b-button @click="() => deleteAddress(address.addressId)" variant="danger">Delete</b-button>
          </ul>
        </b-card-body>
        <!-- </b-col> -->
      </b-row>
    </b-card>
  </div>
</template>

<script>
import addressService from "@/services/address/AddressService.js";

export default {
  props: ["address"],
  data : function() {
      return {
        show: true
      }
    },
  methods: {
    deleteAddress(id) {
      addressService.delete(id);
      console.log(id);
      this.show = false
    }
  }
};
</script>

<style>
</style>