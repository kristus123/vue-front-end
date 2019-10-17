<template>
  <b-container>
    <h1>DELETE a COACH</h1>
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

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    submitForm(value) {
      console.log("____________");
      console.log(value); // someValue
    }
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "UPDATE",
          placeholder: "who ?",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Which team should the person coach ?",
          placeholder: "Select a team",
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