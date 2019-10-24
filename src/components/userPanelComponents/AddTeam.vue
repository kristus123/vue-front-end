<template>
  <div>
    <center>
      <div class="addTeam">
        <div v-if="step === 0">
          <!-- <sort-team-position /> -->
          <h1>create a new Team</h1>

          <hr />

          <label>
            <h3>Name of team</h3>
          </label>
          <b-input-group class="input-group">
            <b-form-select v-model="selectedAssociation" :options="associations"></b-form-select>
            <b-input-group-append>
             
                <add-association-modal @clicked="onClickChild" />
             
            </b-input-group-append>
          </b-input-group>

      


          <label>
            <h3>Select a coach</h3>
          </label>
          <b-input-group class="input-group">
            <b-form-select v-model="selectedCoach" :options="coaches"></b-form-select>
            <b-input-group-append>
              <add-coach-modal />
              <!-- <b-button >Create new coach</b-button> -->
            </b-input-group-append>
          </b-input-group>

          <label>
            <h3>Select an owner</h3>
          </label>
          <b-input-group class="input-group">
            <b-form-select v-model="selectedOwner" :options="owners"></b-form-select>
          </b-input-group>
          <hr />

          <b-button @click="next">Add players to the team</b-button>
        </div>
      </div>
    </center>

    <div v-if="step === 1">
      <h1>Select players</h1>
      <hr />
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="9">
            <player-card style="max-width:50%;">
              <hr />

              <b-button
                v-on:click="() => addToTeam(1)"
                v-if="!selectedPlayers.includes(1)"
                variant="outline-primary"
              >Select for your Team</b-button>

              <b-button
                v-on:click="() => removeFromTeam(1)"
                v-else
                variant="outline-warning"
              >Already selected</b-button>
            </player-card>
          </b-col>
          <b-col>
            <div class="card">
              <div class="card-body">
                <h4>Currently selected</h4>

                <ul>
                  <li v-for="player in selectedPlayers">{{player}}</li>
                </ul>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <center>
        <hr />
        <h1>Next Step</h1>
        <b-button style="margin-bottom:20px;">Soon done !</b-button>
      </center>
    </div>
  </div>
</template>

<script>
import teamService   from '@/services/team/TeamService.js';
import coachService  from '@/services/coach/CoachService.js'
import ownerService  from '@/services/owner/OwnerService.js'
import FlexibleForm from "@/components/forms/FlexibleForm";
import PlayerCard from "@/components/cards/player/PlayerCard";
import playerService from "@/services/player/PlayerService.js";
import AddCoach from '@/components/admin/coach/AddCoach';
import AddCoachModal from '@/components/userPanelComponents/AddCoachModal'

import AddAssociationModal from '@/components/userPanelComponents/AddAssociationModal';

// import  SortTeamPosition from '@/components/userPanelComponents/SortTeamPosition';

export default {
  components: { FlexibleForm, PlayerCard, AddAssociationModal, AddCoach, AddCoachModal },

  async beforeMount() {
    this.players = await playerService.findAll();
    this.coaches = await coachService.findAll();
    this.owners = await ownerService.findAll();
  },

  methods: {
    onClickChild(value) {
      this.associations.push({'value': value + " eehihiehi"});
      console.log("AAAAAAAAAA")
      console.log(value);
    },
    addToTeam(player) {
      this.selectedPlayers.push(player);
    },

    removeFromTeam(id) {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(id), 1);
    },

    next() {
      this.step++;
    }
  },

  data() {
    return {
      step: 0,
      players: [],
      selectedCoach: null,
      selectedOwner: null,
      selectedAssociation: null,
      name: "",
      coach: "",
      owner: "",

      selectedPlayers: [2],

      associations : [
        { value: null, text: "Select an association" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
        { value: "d", text: "This one is disabled", disabled: true }
      ],

      coaches: [
        { value: null, text: "Select a coach" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" },
        { value: "c", text: "This is another option" },
        { value: "d", text: "This one is disabled", disabled: true }
      ],
      owners: [
        { value: null, text: "Select an owner" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Default Selected Option" }
      ]
    };
  }
};
</script>

<style>
.modal-input {
  max-width: 50%;
}
.input-group {
  margin: 20px;
}
.addTeam {
  max-width: 50%;
}

.form {
  margin: 15px;
}

a.blue {
  color: rgb(89, 89, 255);
}

.my-1 {
  /* padding-bottom: 20px; */
}
</style>