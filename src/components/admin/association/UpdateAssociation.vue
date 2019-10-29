<template>
  <b-container>
    <h1>Update an association</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
          :inputs="inputs"
          :image="image"
          :color="textColor"
          @clicked="submitForm"
          @reset="resetForm"
        />
        <b-row id="showNameTakenMsg" class="justify-content-center">
          <b-col cols="7">
            <b-alert variant="warning" show>The name is already taken!</b-alert>
          </b-col>
        </b-row>

        <b-row id="showErrorMsg" class="justify-content-center">
          <b-col cols="7">
            <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
          </b-col>
        </b-row>

        <b-row id="showSuccessMsg" class="justify-content-center">
          <b-col cols="7">
            <b-alert variant="success" show>You have successfully created an association.</b-alert>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import associationService from "@/services/association/AssociationService.js";

import animateService from '@/services/AnimateService'

export default {
  async beforeMount() {
    await this.getAssociation();

  },
  components: {
    FlexibleForm
  },

  mounted: function() {
    document.getElementById('showNameTakenMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
  },

  methods: {

    resetForm() {
      this.$router.go(-1);
    },

    async getAssociation() {
      let association = await associationService.findById(this.$route.params.id);
      this.inputs[0].value = association.name;
      this.inputs[1].value = association.description;
    },

    async submitForm(value) {
      let response = await associationService.update(value, this.$route.params.id);

      if(response.status === 201) {
        this.printMsg('showSuccessMsg', true);
      } else if(response === 500) {
        this.printMsg('showNameTakenMsg');
      } else {
        this.printMsg('showErrorMsg');
      }
    },

    printMsg(element, success) {
      document.getElementById(element).removeAttribute("hidden");
          animateService.animate(element, 'fadeInDown', null, () => {
              animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                if(success) {
                  document.getElementById(element).setAttribute("hidden", "");
                  this.$router.push('/admin/all/association');
                } else {
                  document.getElementById(element).setAttribute("hidden", "");
                }
              });
          });
    }
  },

  data() {
    return {
      textColor: "text-white",
      association: null,
      image: require(`@/assets/depth-of-field-field-grass-61143.jpg`),

      inputs: [
        {
          id: "name",
          title: "Name",
          placeholder: "Name of the association",
          type: "text",
          value: "",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          id: "Description",
          title: "Description",
          value: "",
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