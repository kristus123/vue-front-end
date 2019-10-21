<template>
  <b-container>
    <h1>Add a season</h1>
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
import playerService from "@/services/player/PlayerService.js";

export default {
  components: {
    FlexibleForm
  },

  methods: {
    submitForm(value) {
      playerService.create(value);
    }
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "name",
          placeholder: "season name",
          type: "text",
          required: true,
          disabled: true,
          icon: "fas fa-running"
        },
        {
          title: "description",
          placeholder: "Enter a description",
          type: "text",
          required: true,
          disabled: true,
          icon: "fas fa-user"
        },
        {
          title: "startDate",
          placeholder: "Enter startDate",
          type: "date",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "endDate",
          placeholder: "Enter endDate",
          type: "date",
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