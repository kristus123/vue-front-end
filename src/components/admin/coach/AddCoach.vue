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
        </flexible-form>

        <b-row id="showSuccessMsg" class="justify-content-center">
          <b-col cols="7">
              <b-alert variant="success" show>You have successfully added a coach</b-alert>
          </b-col>
        </b-row>

        <b-row id="showErrorMsg" class="justify-content-center">
          <b-col cols="7">
              <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
          </b-col>
        </b-row>


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
import animateService from '@/services/AnimateService'

export default {
  name: "Addplayer",
  components: {
    FlexibleForm,
    FormSelect
  },

  async beforeMount() {
    await this.getPeople();
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  methods: {
    async submitForm() {
      let response = await coachService.create(this.preselectPerson);
      if(response.status === 200) {
        this.printMsg('showSuccessMsg', true);
      } else {
        this.printMsg('showErrorMsg');
      }
    },

    onSelectPerson(value) {
      this.preselectPerson = value;
      this.onShowBtns = true;
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

    printMsg(element, success) {
      document.getElementById(element).removeAttribute("hidden");
          animateService.animate(element, 'fadeInDown', null, () => {
              animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                if(success) {
                  document.getElementById(element).setAttribute("hidden", "");
                  this.$router.go(-1);
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
      image: require(`@/assets/adult-agenda-black-1543924.jpg`),
      personOptions: [],
      preselectPerson: null,
      onShowBtns: false
    };
  }
};
</script>

<style>
</style>