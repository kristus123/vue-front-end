<template>
    <b-container>
      <h1>Add a player</h1>
        <b-row class="justify-content-center">
          <b-col cols="8">
            <div class="flexDropdown" :style="{backgroundImage: 'url(' + image + ')'}">
              <b-form class="customDropdownForm" v-on:submit.prevent="submitForm">
                <b-form-row class="justify-content-center">
                  <b-col cols="8">
                    <b-form-group class="text-black" label="Pick a person" style="text-align: left;">
                      <b-input-group>
                        <form-select :options="options" :preselect="selectedPerson" v-on:DropDownValue="onSelectedPerson"/>
                      </b-input-group>
                    </b-form-group>
                    




                  </b-col>
                </b-form-row>
              </b-form>
            </div>
          </b-col>
        </b-row>
    </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from '@/components/forms/FormSelect'

import playerService from '@/services/player/PlayerService.js';
import personService from '@/services/person/PersonService'

export default {
  name: "Addplayer",
  components: {
    FlexibleForm,
    FormSelect
  },

  beforeMount: async function() {
    let people = await personService.getPerson();
    let players = await playerService.findAll();
    let teams = await teamService.findAll();

    let nonPlayers = [];
    let option = [];

    //Extract the persons that dont have a player
    for(var i = 0; i < people.length; i++) {
      if(!players.some(item => item.person.personId === people[i].personId)){
          nonPlayers.push(people[i]);
      }
    }
    
    //Populating the options for the dropdown
    for(var i = 0; i < nonPlayers.length; i++) {
      if(i === 0) {
        option[i] = {
          value: null,
          text: 'Please select a person',
          disabled: true
        }
      }

      option[i+1] = {
        value: nonPlayers[i],
        text: nonPlayers[i].firstName + " " + nonPlayers[i].lastName
      }
    }
    this.options = option;
    console.log(this.options);

  },


  methods: {
    submitForm(value) {
      playerService.create(value);
    },

    onSelectedPerson(value) {
      this.selectedPerson = value;
      console.log(this.selectedPerson);
    },
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      selectedPerson: null,
      inputs: [
        {
          title: "Normal Position",
          placeholder: "Enter a position",
          type: "text",
          required: true,
          disabled: false,
          icon: "fas fa-layer-group"
        },
        {
          title: "Player Number",
          placeholder: "Enter a player number",
          type: "number",
          required: "required",
          disabled: false,
          icon: "fas fa-hashtag"
        }
      ],
      options: [],

    };
  }
};
</script>

<style>
</style>