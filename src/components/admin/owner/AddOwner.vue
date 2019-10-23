<template>
  <b-container>
    <h1>Add an owner</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import ownerService from '@/services/owner/OwnerService.js'

export default {
  components: {
    FlexibleForm
  },

  methods: {
    submitForm(value) {
      ownerService.create(value);
      //playerService.create(value);
    }
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Person ID",
          placeholder: "Select a person",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-running"
        },
        {
          title: "Team ID",
          placeholder: "Enter a team ID",
          type: "number",
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