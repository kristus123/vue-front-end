<template>
 <div>
   <h1>Velkommen til admin {{$store.state.userObject.username}}</h1>
    <hr class="pretty" />

    <b-container class="bv-example-row">
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>
          <router-link to="/admin/manage/user">
            <b-button variant="outline-warning" size="sm">Administrate users</b-button>
          </router-link>
        </b-col>
        <b-col>
          <router-link to="/user">
            <b-button variant="outline-primary" size="sm">Go to user-panel</b-button>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
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