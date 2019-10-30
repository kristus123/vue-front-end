<template>
  <b-container>
    <h1>Add a player</h1>
    <div v-if="loading">
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>

    <flexible-form
      v-else
      :image="image"
      :inputs="inputs"
      :color="textColor"
      @clicked="submitForm"
      @reset="resetForm"
    >
      <template v-slot:personDropdown>
        <b-form-row class="justify-content-center">
          <b-col cols="8">
            <b-form-group class="text-black" label="Pick a person" style="text-align: left;">
              <b-input-group>
                <b-input-group-prepend>
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                </b-input-group-prepend>
                <form-select
                  :options="personOptions"
                  :preselect="selectedPerson"
                  v-on:DropDownValue="onSelectedPerson"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>

      <template v-slot:teamDropdown>
        <b-form-row class="justify-content-center">
          <b-col cols="8">
            <b-form-group class="text-black" label="Pick a team" style="text-align: left;">
              <b-input-group>
                  <b-input-group-prepend>
                      <span class="input-group-text"><i class="fas fa-users"></i></span>
                  </b-input-group-prepend>
                <form-select
                  :options="teamOptions"
                  :preselect="selectedTeam"
                  v-on:DropDownValue="onSelectedTeam"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>

      <template v-slot:newForm>
        <b-form-row class="justify-content-center">
          <b-col cols="8">
            <b-form-group class="text-black" label="Date" style="text-align: left;">
              <v-date-picker
              v-model="dateRange"
              mode="range"
              :columns="2"
              :input-props='{
                placeholder: "Please enter a range",
                readonly: true
              }'
              />
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
    </flexible-form>

    <b-row id="showSuccessMsg" class="justify-content-center">
      <b-col cols="7">
        <b-alert variant="success" show>You have successfully added a player</b-alert>
      </b-col>
    </b-row>

    <b-row id="showErrorMsg" class="justify-content-center">
      <b-col cols="7">
        <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import FlexibleInputs from "@/components/forms/inputs/FlexibleInputs";
import FormSelect from "@/components/forms/FormSelect";

import playerService from "@/services/player/PlayerService.js";
import personService from "@/services/person/PersonService";
import teamService from "@/services/team/TeamService";

import animateService from "@/services/AnimateService";

var dateFormat = require("dateformat");

export default {
  name: "Addplayer",
  components: {
    FlexibleForm,
    FormSelect,
    FlexibleInputs
  },

  mounted: function() {
    document.getElementById("showSuccessMsg").setAttribute("hidden", "");
    document.getElementById("showErrorMsg").setAttribute("hidden", "");
  },

  beforeMount: async function() {
    await this.getPeople();
    await this.getTeams();
    this.loading = false;
  },

  methods: {
    async getTeams() {
      let teams = await teamService.findAll();
      let teamOptions = [];

      for (var i = 0; i < teams.length; i++) {
        if (i === 0) {
          teamOptions[i] = {
            value: null,
            text: "Please pick a team",
            disabled: true
          };
        }

        teamOptions[i + 1] = {
          value: teams[i],
          text: teams[i].association.name,
          disabled: false
        };
      }

      this.teamOptions = teamOptions;
    },

    async getPeople() {
      let people = await personService.getPerson();
      let filteredPeople = await this.filterPeople(people);

      let personOptions = [];

      for (var i = 0; i < filteredPeople.length; i++) {
        if (i === 0) {
          personOptions[i] = {
            value: null,
            text: "Please pick a person",
            disabled: true
          };
        }

        personOptions[i + 1] = {
          value: filteredPeople[i],
          text: filteredPeople[i].firstName + " " + filteredPeople[i].lastName,
          disabled: false
        };
      }

      this.personOptions = personOptions;
    },

    async filterPeople(people) {
      let players = await playerService.getAll();
      let nonPlayers = [];

      for (var i = 0; i < people._embedded.personModelList.length; i++) {
        delete people._embedded.personModelList[i]._links;
        if (
          !players._embedded.playerModelList.some(
            item =>
              item.person.personId ===
              people._embedded.personModelList[i].personId
          )
        ) {
          nonPlayers.push(people._embedded.personModelList[i]);
        }
      }
      return nonPlayers;
    },

    resetForm() {
      for (var i = 0; i < this.inputs.length; i++) {
        this.inputs[i].value = "";
      }

      this.dateRange = "";
      this.selectedPerson = null;
      this.selectedTeam = null;
    },

    async submitForm(value) {
      let playerObject;

      if (this.dateRange.start !== null && this.dateRange.end !== null) {
        var start = dateFormat(this.dateRange.start, "yyyy-mm-dd");
        var end = dateFormat(this.dateRange.end, "yyyy-mm-dd");

        playerObject = {
          teamDateFrom: start,
          teamDateTo: end,
          personId: this.selectedPerson.personId,
          teamId: this.selectedTeam.teamId,
          playername:
            this.selectedPerson.firstName + " " + this.selectedPerson.lastName,
          normalPosition: value[0].value,
          playerNumber: value[1].value
        };
      }

      let response = await playerService.add(playerObject);
      if (response.status === 201) {
        this.resetForm();
        this.printMsg("showSuccessMsg");
        this.getPeople();
      } else {
        this.printMsg("showErrorMsg");
      }
    },

    onSelectedPerson(value) {
      this.selectedPerson = value;
    },

    onSelectedTeam(value) {
      this.selectedTeam = value;
    },

    printMsg(element) {
      document.getElementById(element).removeAttribute("hidden");
      animateService.animate(element, "fadeInDown", null, () => {
        animateService.animate(element, "fadeOutUp", "delay-2s", () => {
          document.getElementById(element).setAttribute("hidden", "");
        });
      });
    }
  },

  data() {
    return {
      loading: true,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      selectedPerson: null,
      selectedTeam: null,
      dateRange: {
        start: null,
        end: null
      },
      inputs: [
        {
          title: "Normal Position",
          placeholder: "Enter a position",
          type: "text",
          required: true,
          value: "",
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
      personOptions: [],
      teamOptions: []
    };
  }
};
</script>

<style>
</style>