<template>
  <b-container>
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
              <b-form-group class="text-white" label="Pick a team" style="text-align: left;">
                <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-users"></i></span>
                    </b-input-group-prepend>
                  <form-select :options="teamOptions" :preselect="teamPreselect" v-on:DropDownValue="onSelectTeam"/>
                  <b-input-group-append>
                    <b-btn variant="primary" @click="$router.push('/admin/add/team')">Create new</b-btn>
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
import teamService from '@/services/team/TeamService'

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect"
export default {
  components : {FlexibleForm, FormSelect},
  async beforeMount() {
    await this.getTeams();
  },

  methods: {
    async getTeams() {
      let teams = await teamService.findAll();
      let options = [];

      for(var i = 0; i < teams.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please select a team',
            disabled: true
          }
        }

        options[i+1] = {
          value: teams[i].teamId,
          text: teams[i].association.name,
          disabled: false
        }
      }
      this.teamOptions = options;
    },

    onSelectTeam(value) {
      this.teamPreselect = value;
      this.$router.push(`/admin/update/team/${this.teamPreselect}`);
    }
  },

  data() {
    return {
      teams : [],
      image: require(`@/assets/activity-athletes-blue-262524.jpg`),
      textColor: 'text-white',
      onShowBtns: false,
      teamOptions: [],
      teamPreselect: null
    }
  },

}
</script>

<style>
</style>