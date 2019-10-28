<template>
  <b-container>
    <h1>Upadte an owner</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
         <flexible-form
          :image="image"
          :color="textColor"
          :showBtns="onShowBtns"
          @clicked="submitForm"
        >

        <template v-slot:dropdown>
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
              <b-alert variant="success" show>You have successfully updated a coach</b-alert>
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
import ownerService from "@/services/owner/OwnerService.js";
import personService from "@/services/person/PersonService";
import FormSelect from "@/components/forms/FormSelect";

import animateService from '@/services/AnimateService'

export default {
  components: { FlexibleForm, FormSelect },

  async beforeMount() {
    this.getPeople();
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  methods: {

    async submitForm() {
      let response = await ownerService.update(this.preselectPerson, this.$route.params.id);
      if(response.status === 201) {
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
      let people = await personService.getPerson();
      this.filterPeople(people);

    },

    async filterPeople(people) {
      let owners = await ownerService.findAll();
      let filteredPeople = [];
      let options = [];

      for(var i = 0; i < people._embedded.personModelList.length; i++) {
        if(!owners.some(item => item.person.personId === people._embedded.personModelList[i].personId)) {
          filteredPeople.push(people._embedded.personModelList[i]);
        }
      }

      for(var i = 0; i < filteredPeople.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: await this.getOwner(),
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
    async getOwner() {
      let coach = await ownerService.findById(this.$route.params.id);
      return coach.person.firstName + " " + coach.person.lastName;

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
      textColor: "text-black",
      onShowBtns: false,
      image: require(`@/assets/adult-blur-businessman-288477.jpg`),
      preselectPerson: null,
      personOptions: [],
    };
  }
};
</script>

<style scoped>
</style>