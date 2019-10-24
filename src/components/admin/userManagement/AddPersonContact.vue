<template>
    <b-card style="max-width:80%;">
  <center v-if="show">
      <h3>Add contact info for this user</h3>
      <div class="input">
        


<select v-model="contactType">
  <option value="xxx" disabled>Select a type</option>
  <option value="EMAIL">email</option>
  <option value="PHONE">phone</option>
</select>



        <hr class="pretty" />
        <b-input v-model="contactDetail" placeholder="Contact details" />
        <hr class="pretty" />
        <b-button @click="addContact" variant="primary">Add</b-button>
      </div>
  </center>
  <div v-else>
    <center>
      <h3>Added successfully!</h3>
      <b-button @click="show=true" variant="primary">Add more ? </b-button>
    </center>

  </div>
    </b-card>
</template>

<script>
import contactService from "@/services/person/ContactService.js";
export default {
  props: ["personId"],
  data() {
    return {
      contactType : null,
      contactDetail: null,
      response : null,
      show : true
    }
  },
  methods: {
    async addContact() {
      this.response = await contactService.add(this.personId, this.contactType, this.contactDetail);
      this.contactType   = "";
      this.contactDetail = "";
      this.show = false;
    }
  }
};
</script>

<style scoped>
.input {
  max-width: 50%;
}
</style>