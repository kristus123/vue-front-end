<template>
  <b-container>
    <h1>Associations</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form :image="image" :showBtns="onShowBtns">

          <template v-slot:dropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Pick an association" style="text-align: left;">
                  <b-input-group>
                    <form-select :options="associationOptions" :preslecet="preselectAssociation" v-on:DropDownValue="onSelectAssociation"/>
                    <b-input-group-append>
                      <b-btn variant="primary" @click="$router.push('/admin/add/association')">Create new</b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>

          <template v-slot:newForm v-if="onUpdate">
            <b-btn variant="primary" size="lg" @click="$router.push(`/admin/update/association/${preselectAssociation}`)">Update</b-btn>
          </template>

        </flexible-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import associationService from "@/services/association/AssociationService.js";

import FormSelect from "@/components/forms/FormSelect";
import FlexibleForm from "@/components/forms/FlexibleForm"

export default {
  components: { 
    FormSelect,
    FlexibleForm
  },

    async beforeMount() {
      await this.getAssociations();
  },

  methods: {
    deleteAssociation(id) {
      associationService.deleteAssociation(id);
    },

    onSelectAssociation(value) {
      this.preselectAssociation = value;
      this.onUpdate = true;
    },

    async getAssociations() {
      let associations = await associationService.findAll();
      let options = [];

      for(var i = 0; i < associations.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick an association',
            disabled: true
          }
        }

        options[i+1] = {
          value: associations[i].associationId,
          text: associations[i].name,
          disabled: false
        }
      }
      this.associationOptions = options;
    }
  },

  data() {
    return {
      associationOptions: [],
      image: require(`@/assets/depth-of-field-field-grass-61143.jpg`),
      onShowBtns: false,
      onUpdate: false,

      preselectAssociation: null,

    };
  }
};
</script>

<style>
</style>