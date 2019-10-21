<template>
<div>
  <b-container v-if="response == null">
      
    <h1>Add an Association</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      @clicked="submitForm"
    />
  </b-container>

    <div v-if="response === 500">
        <h1>association-name already taken</h1>
        <b-button @click="response = null">Try again</b-button>
    </div>

  <div v-else>
      {{response}}
  </div>

</div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import formService from '@/services/form/FormService.js';
import associationService from '@/services/association/AssociationService.js';

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  methods: {
    async submitForm(value) {
      this.response = await associationService.create(value);

    }
  },

  data() {
    return {
      textColor: "text-black",
      response : null,
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Name",
          placeholder: "Name of the association",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Description",
          placeholder: "Select a team",
          type: "text",
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