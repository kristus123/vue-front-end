<template>
<div> 
  <b-container v-if="response == null">
    <h1>Add new user</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>

  <div v-else>
      <h1> User : {{response.username}} has been successfully created </h1>
  </div>


</div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import userManagementService from '@/services/userManagement/UserManagementService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },


  methods: {
    async submitForm(value) {
      console.log("____________");
      this.response = await userManagementService.createUser(value);
      console.log(value); // someValue
    }
  },

  data() {
    return {
      textColor: "text-black",
        response: null,
    image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "username",
          placeholder: "Username",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "password",
          placeholder: "strong password",
          type: "password",
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