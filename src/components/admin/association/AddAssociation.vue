<template>
  <b-container>
    <h1>Add an association</h1>
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
import formService from '@/services/form/FormService.js';
import associationService from '@/services/association/AssociationService.js';

import animateService from '@/services/AnimateService'

export default {
  name: "Addplayer",
  components: {
    FlexibleForm
  },

  mounted: function() {
      document.getElementById('showNameTakenMsg').setAttribute("hidden", "");
      document.getElementById('showErrorMsg').setAttribute("hidden", "");
      document.getElementById('showSuccessMsg').setAttribute("hidden", "");
  },

  methods: {
    async submitForm(value) {
      let response = await associationService.create(value);
      console.log(response);

      if(response.status === 201) {
        this.printMsg('showSuccessMsg', true);
      } else if(response === 500) {
        this.printMsg('showNameTakenMsg');
      } else {
        this.printMsg('showErrorMsg');
      }

    },

    resetForm() {
      for(var i = 0; i < this.inputs.length; i++) {
        this.inputs[i].value = '';
        
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
      image: require(`@/assets/depth-of-field-field-grass-61143.jpg`),
      inputs: [
        {
          title: "Name",
          placeholder: "Please enter a name",
          type: "text",
          value: '',
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "Description",
          placeholder: "Please enter a description",
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