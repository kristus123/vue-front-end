<template>
  <b-container>
    <div>
      <h1>All players</h1>
      <hr class="pretty" style="padding-bottom:20px;" />

      <center style="margin-bottom:50px;" v-if="!loading">
        <b-input
          placeholder="Search for a player"
          :value="playerSearch"
          @change="v => playerSearch = v"
          style="max-width:40%;"
        />
        <p style="color:grey; margin-top:10px;">SMACK that 'Enter' button</p>
      </center>

      <div v-if="loading">
         <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      </div>

      <b-row class="justify-content-center">
        <div v-for="player in playerSearchFilter" v-bind:key="player.id">
          <!-- {{player}} -->
          <b-col>
            <playerCard :playerAttr="player" style="max-width:100%;">
              <hr />
              <router-link :to="`/user/player/${player.playerId}`">
                <b-button size="lg" variant="outline-primary">More info</b-button>
              </router-link>
              <!-- <h1>{{players}}</h1> -->
            </playerCard>
          </b-col>
          <div style="padding-top:20px;"></div>
        </div>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import PlayerCard from "@/components/cards/player/PlayerCard";
import playerService from "@/services/player/PlayerService";
export default {
  computed: {
    playerSearchFilter() {
      if (this.playerSearch === "") return this.players;
      return this.players.filter(player => {
        console.log(player.playername);
        console.log(
          player.playername.toLowerCase().includes(this.playerSearch)
        );
        return player.playername.toLowerCase().includes(this.playerSearch);
      });
    }
  },

  async beforeMount() {
    this.players = await playerService.findAll();
    this.loading = false;
  },
  data() {
    return {
      loading : true,
      playerSearch: "",
      players: []
    };
  },
  components: { PlayerCard }
};
</script>

<style>
</style>