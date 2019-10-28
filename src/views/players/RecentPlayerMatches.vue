<template>
  <div>
    <router-link :to="`/user/player/${$route.params.playerId}`">
      <b-button variant="outline-primary" size="sm">go back</b-button>
    </router-link>
    <center>
      <div>
        <h1 style="margin-bottom:40px;">Player history for</h1>
        <div style="max-width:80%" v-for="team in playerHistory" v-bind:key="team.teamId">
          <team-history :team="team" />
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import TeamService from "@/services/team/TeamService";
import PlayerService from "@/services/player/PlayerService";
import TeamHistory from "@/views/players/TeamHistory";
export default {
  components: { TeamHistory },
  async beforeMount() {
    this.playerHistory = await PlayerService.findPlayerHistory(
      this.$route.params.playerId
    );
  },
  data() {
    return {
      playerHistory: null
    };
  }
};
</script>

<style>
</style>