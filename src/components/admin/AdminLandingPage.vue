<template>
  <div class="container">
    <img src="@/assets/footballField.jpeg" alt="Snow" style="width:80%;" />
    <div class="centered">
      <h1>Team-structure for 'DREAMTEAM'</h1>
      <br />
      <br />
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="front"
              />
            </b-card>
          </div>

          <div class="col-md-6">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="front"
              />
            </b-card>
          </div>
        </div>
      </div>
      <br />

      <div>
        <div class="row">
          <div class="col-md-3">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="middle"
              />
            </b-card>
          </div>

          <div class="col-md-3">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="middle"
              />
            </b-card>
          </div>
          <div class="col-md-3">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="middle"
              />
            </b-card>
          </div>
          <div class="col-md-3">
            <b-card>
              <select-player
                :options="options"
                @addPlayerToTeam="addPlayerToTeam"
                position="middle"
              />
            </b-card>
          </div>
        </div>
      </div>

      <br />

      <div>
        <div class="row">
          <div class="col-md-3">
            <b-card>
              <select-player :options="options" @addPlayerToTeam="addPlayerToTeam" position="back" />
            </b-card>
          </div>

          <div class="col-md-3">
            <b-card>
              <select-player :options="options" @addPlayerToTeam="addPlayerToTeam" position="back" />
            </b-card>
          </div>
          <div class="col-md-3">
            <b-card>
              <select-player :options="options" @addPlayerToTeam="addPlayerToTeam" position="back" />
            </b-card>
          </div>
          <div class="col-md-3">
            <b-card>
              <select-player :options="options" @addPlayerToTeam="addPlayerToTeam" position="back" />
            </b-card>
          </div>
        </div>
      </div>
      <hr class="pretty">
        <b-button @click="updatePlayers" variant="primary" size="lg">Submit your changes</b-button>
    </div>
    <!-- <h1 style="color:black;">{{teamStructure}}</h1> -->
  </div>
</template>

<script>
import SelectPlayer from "@/components/admin/player/SelectPlayer";
import FormSelect from "@/components/forms/FormSelect";
import teamService from "@/services/team/TeamService.js";
import playerService from '@/services/player/PlayerService.js';

// import SelectPlayer from '@/components/admin/player/SelectPlayer';
export default {
  async beforeMount() {
    const liste = await teamService.getAllPlayersOfTeam(1);

    liste.forEach(player => {
      this.options.push({
        value: player,
        text: player.playername
      });
    });

    console.log(this.options);
  },

  methods: {
    updatePlayers() {
      this.teamStructure.forEach(player => {
        playerService.update(player)
      })
    },
    addPlayerToTeam(value) {
      console.log(value.playername);
      // teamStructure.forEach(player => {
      if (
        !this.teamStructure.some(item => item.playername === value.playername)
      ) {
        this.teamStructure.push(value);
      } else {
        alert("player already selected somewhere else");
      }
    }
  },
  data() {
    return {
      teamStructure: [],
      options: [
        // {
        //   value: null,
        //   text: "Select a player",
        //   disabled: true
        // },
      ]
    };
  },
  components: { SelectPlayer, FormSelect }
};
</script>

<style scoped>
/* Container holding the image and the text */
.container {
  position: relative;
  text-align: center;
  color: white;
}

.centered {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>