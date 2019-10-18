<template>
<div>
  <b-container v-if="response == null">
    <h1>Add a player</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>

  <div v-else>
    <h1>{{response}}</h1>
  </div>

</div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import personService from '@/services/person/PersonService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    async submitForm(value) {
      this.response = await personService.create(value);
      console.log(this.response);
    }
  },

  data() {
    return {
      textColor: "text-black",
      response : null,
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "First name",
          placeholder: "Name",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-layer-group"
        },

        {
          title: "Last name",
          placeholder: "Name",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-layer-group"
        },
        {
          title: "Date of birth",
          placeholder: "Name",
          type: "date",
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