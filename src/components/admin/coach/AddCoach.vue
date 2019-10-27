<template>
  <b-container>
    <h1>Add a coach</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
          :image="image"
          :color="textColor"
          :showBtns="onShowBtns"
          @clicked="submitForm"
        >
          <template v-slot:firstDropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Pick a person" style="text-align: left;">
                  <b-input-group>
                    <form-select :options="personOptions" :preslecet="preselectPerson" v-on:DropDownValue="onSelectPerson"/>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>

          <template v-slot:teamDropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Pick a team" style="text-align: left;">
                  <b-input-group>
                    <form-select :options="teamOptions" :preselect="preselectTeam" v-on:DropDownValue="onSelectTeam"/>
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
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";
import coachService from '@/services/coach/CoachService';
import personService from '@/services/person/PersonService';
import formService from '@/services/form/FormService.js';
import teamService from "@/services/team/TeamService";

export default {
  name: "Addplayer",
  components: {
    FlexibleForm,
    FormSelect
  },

  async beforeMount() {
    await this.getPeople();
    await this.getTeams();
  },

  methods: {
    submitForm(value) {
      coachService.turnPersonIntoCoach(value);
    },

    onSelectPerson(value) {
      this.preselectPerson = value;
      this.onShowBtns = true;
    },

    onSelectTeam(value) {
      this.preselectTeam = value;
    },

    async getPeople() {
      let allPeople = await personService.getPerson();
      let people = [];

      for(var i = 0; i < allPeople._embedded.personModelList.length; i++) {
          people[i] = {
            personId: allPeople._embedded.personModelList[i].personId,
            firstName: allPeople._embedded.personModelList[i].firstName,
            lastName: allPeople._embedded.personModelList[i].lastName
          }
      }
      this.filterPeople(people);
    },

    async filterPeople(people) {
      let coaches = await coachService.findAll();
      let filteredPeople = [];
      let options = [];

      for(var i = 0; i < people.length; i++) {
        if(!coaches.some(item => item.person.personId === people[i].personId)) {
          filteredPeople.push(people[i]);
        }
      }

      for(var i = 0; i < filteredPeople.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick a person',
            disabled: true
          }
        }

        options[i+1] = {
          value: filteredPeople[i].personId,
          text: filteredPeople[i].firstName + " " + filteredPeople[i].lastName,
          disabled: false
        }
      }

      this.personOptions = options;

    },

    async getTeams() {
      let teams = await teamService.findAll();
      console.log(teams);
      let options = [];

      for(var i = 0; i < teams.length; i++) {
        if(i === 0) {
            options[i] = {
            value: null,
            text: 'Please pick a team',
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
    }
  },

  data() {
    return {
      textColor: "text-white",
      image: require(`@/assets/adult-agenda-black-1543924.jpg`),
      personOptions: [],
      teamOptions: [],
      preselectTeam: null,
      preselectPerson: null,
      onShowBtns: false
    };
  }
};
</script>

<style>
</style>