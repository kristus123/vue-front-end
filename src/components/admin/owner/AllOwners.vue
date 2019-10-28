<template>
  <b-container>
    <h1>Owners</h1>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <flexible-form
          :image="image"
          :color="textColor"
          :showBtns="onShowBtns"
          >
            <template v-slot:dropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Pick a coach" style="text-align: left;">
                  <b-input-group>
                    <form-select :options="ownerOptions" :preselect="ownerPreselect" v-on:DropDownValue="onSelectOwner"/>
                    <b-input-group-append>
                      <b-btn variant="primary" @click="$router.push('/admin/add/owner')">Create new</b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>
        </flexible-form>

        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import ownerService from "@/services/owner/OwnerService.js";

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";
export default {
  components : {
    FlexibleForm,
    FormSelect
    },
  async beforeMount() {
    await this.getOwners();
  },

  methods: {
    onSelectOwner(value) {
      this.ownerPreselect = value;
      this.$router.push(`/admin/update/owner/${this.ownerPreselect}`);

    },

    async getOwners() {
      let owners = await ownerService.findAll();
      let options = [];
      for(var i = 0; i < owners.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick an owner',
            disabled: true 
          }
        }

        options[i+1] = {
          value: owners[i].ownerId,
          text: owners[i].person.firstName + " " + owners[i].person.lastName,
          disabled: false
        }
      }

      this.ownerOptions = options;
    }

  },

  data() {
    return {
      owners: [],
      ownerPreselect: null,
      ownerOptions: [],

      image: require(`@/assets/adult-blur-businessman-288477.jpg`),
      textColor: 'text-white',
      onShowBtns: false,


    };
  }
};
</script>

<style>
</style>