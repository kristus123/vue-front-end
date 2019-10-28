<template>
  <b-container>
    <h1>Coach</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form :image="image" :showBtns="onShowBtns">
          <template v-slot:dropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Pick a coach" style="text-align: left;">
                  <b-input-group>
                    <form-select :options="coachOptions" :preselect="coachPreselect" v-on:DropDownValue="onSelectCoach"/>
                    <b-input-group-append>
                      <b-btn variant="primary" @click="$router.push('/admin/add/coach')">Create new</b-btn>
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
import GenericCard from "@/components/cards/reusables/GenericCard";
import coachService from "@/services/coach/CoachService";
import CoachCard from '@/components/admin/coach/CoachCard'
import FlexibleForm from "@/components/forms/FlexibleForm"
import FormSelect from "@/components/forms/FormSelect"
export default {
  components: { GenericCard, CoachCard, FlexibleForm, FormSelect },

  async beforeMount() {
    await this.getCoaches();

  },

  methods: {
    async getCoaches() {
      let coaches = await coachService.findAll();
      let options = [];

      for(var i = 0; i < coaches.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick a coach',
            disabled: true
          }
        }

        options[i+1] = {
          value: coaches[i].coachId,
          text: coaches[i].person.firstName + " " + coaches[i].person.lastName,
          disabled: false
        }
      }

      this.coachOptions = options;

    },

    onSelectCoach(value) {
      this.coachPreselect = value;
      this.$router.push(`/admin/update/coach/${this.coachPreselect}`);
    },
  },

  data() {
    return {
      coachOptions: [],
      onShowBtns: false,
      coachPreselect: null,
      image: require(`@/assets/adult-agenda-black-1543924.jpg`)
    };
  }
};
</script>

<style>
</style>