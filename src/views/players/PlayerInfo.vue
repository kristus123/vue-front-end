<template>
  <div style="max-width:100%;">
    <h1>{{player.playername}}</h1>

    <hr class="pretty" style="padding-bottom:50px;" />

    <!-- <b-container class="bv-example-row"> -->
    <b-row>
      <b-col cols="8">
        <b-img :src="player.imageUrl" rounded fluid alt="Responsive image"></b-img>
        <!-- <hr class="pretty"> -->
        <center>
          <b-card style="margin-top:40px; margin-bottom:40px; max-width:80%;">{{fact}}</b-card>
        </center>
      </b-col>
      <b-col>
        <router-link :to="`/user/player/${player.playerId}/recent-matches`">
          <b-button
            variant="outline-primary"
            size="sm"
            style="margin-bottom:20px;"
          >See recent matches</b-button>
        </router-link>
        <!-- <hr class="pretty"> -->
        <div class="pretty">
          <p class="text-left grey">Currently plays for</p>
          <h1>{{player.team.association.name}}</h1>

          <h5 style="color:grey;">"{{player.team.association.description}}"</h5>
          <router-link :to="`/user/player/${player.playerId}/team-history`">
            <b-button variant="outline-primary" style="margin-top:20px;" size="sm">See team history</b-button>
          </router-link>
        </div>

        <div class="pretty">
          <p class="text-left grey">Player Position</p>

          <h5>"{{player.normalPosition}}"</h5>
          <!-- <hr class="pretty"> -->
        </div>

        <div class="pretty">
          <div>
            <p class="grey">Fan-mail</p>
            <!-- <hr class="pretty"> -->
            <h5>{{player.person.address.addresses[0]}}</h5>
            <h5>{{player.person.address.postalCode}}</h5>

            <h5>{{player.person.address.city}}</h5>

            <h5>{{player.person.address.country}}</h5>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- <hr> -->
    <div class="pretty">
      <h1>"he is the best of the best"</h1>
      <h5
        class="text-right"
        style="color:grey; padding-right:30px; padding-top:30px;"
      >-Kristian 2019</h5>
    </div>
    <div style="padding-top:100px;"></div>
    <!-- </b-container> -->
  </div>
</template>

<script>
import axios from "axios";
import playerService from "@/services/player/PlayerService";
export default {
  async beforeMount() {
    this.player = await playerService.findById(this.$route.params.playerId);
    this.fact = await axios
      .get("https://cors-anywhere.herokuapp.com/https://catfact.ninja/fact")
      .then(response => response.data.fact);
  },
  data() {
    return {
      player: null,
      fact: null
    };
  }
};
</script>

<style>
.nav-button {
  margin-left: 20px;
}

div.pretty {
  /* margin-bottom: 20px; */
  border-radius: 25px;
  border: 2px solid orange;
  padding: 20px;
  /* width: 300px; */
  /* height: 150px; */
  margin-bottom: 20px;
}
p.grey {
  color: grey;
}
</style>