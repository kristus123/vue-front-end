<template>
  <b-container>
    <h1>update an Association</h1>
    {{association}}
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
import associationService from "@/services/association/AssociationService.js";

export default {
  async beforeMount() {
    console.log("hei");
    this.association = await associationService.findById(this.$route.params.id);
    console.log(await this.association);
    this.inputs[0].value = await this.association.associationId
    this.inputs[1].value = await this.association.name
    this.inputs[2].value = await this.association.description
  },
  components: {
    FlexibleForm
  },

  methods: {
    async submitForm(value) {
      associationService.update(value);
      console.log("____________");
      this.association = await associationService.findById(this.$route.params.id);
      //   console.log(value); // someValue
    }
  },

  data() {
    return {
      textColor: "text-black",
      association: null,
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),

      inputs: [
          {
            id: "id",
          title: "id",
          placeholder: "temp",
          type: "number",
          value: "temp",
          required: true,
          disabled: true,
          icon: "fas fa-users"
        },
        {
            id: "name",
          title: "Name",
          placeholder: "Name of the association",
          type: "text",
          value: "temp",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
            id : "Description",
          title: "Description",
          value: "temp",
          placeholder: "Descriptipnnnon",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        }
      ]
    };
  }
};
</script>

<style>
</style>