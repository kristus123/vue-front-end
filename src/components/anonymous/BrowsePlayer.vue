<template>
  <b-container>
    <div style="max-width:100%;">
      <h1 style="color:black;">One player</h1>
      <hr class="pretty" />

      <center>
        <h3>Player Data</h3>
        <b-row class="justify-content-center">
          <b-col cols="8">
            <form-select :options="playerOptions" v-on:DropDownValue="onSelectPlayer" />
            <!-- <p><br></p> -->
            <h1 style="padding-top:40px;">{{playerData}}</h1>
          </b-col>
        </b-row>
        <hr class="pretty" />

        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="8">
              <div v-for="player in player">
                <div style="max-width:100%; padding:20px;"></div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </center>
    </div>
  </b-container>
</template>

<script>
import PlayerService from "@/services/player/PlayerService";
import FormSelect from "@/components/forms/FormSelect";

export default {
  async beforeMount() {
    this.getPlayers();
  },

  methods: {
    async getPlayers() {
      let players = await PlayerService.findAll();
      let options = [];

      for (var i = 0; i < players.length; i++) {
        console.log(players[i]);
        delete players[i]._links;

        if (i === 0) {
          options[i] = {
            value: null,
            text: "Please select a player",
            disabled: true
          };
        }

        options[i + 1] = {
          value: players[i].playerId,
          text: players[i].playername,

          disabled: false
        };
      }

      this.playerOptions = options;
    },

    async onSelectPlayer(value) {
      this.playerData = "";
      this.player = await PlayerService.findAnonPlayerById(value);
      console.log(this.player);
      this.playerData =
        this.player.playerName + " plays for " + this.player.teamName;
    }
  },

  data() {
    return {
      playerData: "",
      player: "",
      searchString: "",
      filteredList: this.players,
      playerString: "",
      playerOptions: []
    };
  },
  components: {
    FormSelect
  }
};
</script>

<style>
h1 {
  text-align: center;
}

h1 span {
  /* background-color: black;  */
  border-radius: 200px;
  background: rgb(0, 0, 0);
  padding: 10px;
  width: 10px;
  height: 10px;
}
</style>