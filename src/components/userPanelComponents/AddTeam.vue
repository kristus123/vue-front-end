<template>
  <div>
    <div class="addTeam">
     
        <div v-if="step === 0">
          <label>
            <h3>Name of team</h3>
          </label>
          <b-form-input class="form" id="input-default" placeholder="Enter The name of the team"></b-form-input>

          <label>
            <h3>Select a coach</h3>
          </label>
          <b-form-select class="form" v-model="selected" :options="coaches"></b-form-select>

          <label>
            <h3>Select an owner</h3>
          </label>
          <b-form-select class="form" v-model="selected" :options="owners"></b-form-select>

          <hr />
          <label>next Step</label>
          <br />
          <b-button @click="next">Add players to the team</b-button>
        </div>
 
    </div>

    <div v-if="step === 1">
      <h1>Select players</h1>
      <player-card>
        <hr>
        <b-button variant="outline-primary">Select for your Team</b-button>
      </player-card>
    
    
    <center>
      <hr>
      <h1>Next Step</h1>
      <b-button style="margin-bottom:20px;">Soon done !</b-button>
    </center>

    </div>
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import PlayerCard from "@/components/cards/player/PlayerCard";
export default {
  components: { FlexibleForm, PlayerCard },

  methods: {
    next() {
      this.step++;
    }
  },

  data() {
    return {
      step: 0,
      selected: null,
      name: "",
      coach: "",
      owner: "",

      players: [],

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