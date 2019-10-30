<template>
  <div>
      <h1>Add new user</h1>
      <hr class="pretty">
    <b-container v-if="response == null && !loading">
      <flexible-form
        :inputs="inputs"
        width="100%"
        :image="image"
        :color="textColor"
        @clicked="submitForm"
      />
    </b-container>

    <div v-else-if="loading">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>

    <div v-else>
      <h1 style="margin-top:100px;">{{response.username}}
        <strong style="color:green;">successfully</strong>
         created</h1>

      <router-link to="/admin/manage/user">
        <b-button variant="outline-primary" style="margin-top:50px;" size="sm">head back</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import userManagementService from "@/services/userManagement/UserManagementService.js";

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    async submitForm(value) {
      this.loading = true;
      console.log("____________");
      this.response = await userManagementService.createUser(value);
      console.log(value); // someValue
      this.loading = false;
    }
  },

  data() {
    return {
      loading: false,
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
        }
      ]
    };
  }
};
</script>

<style>
</style>