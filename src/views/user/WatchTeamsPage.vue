<template>
  <div>
    <h1 class="welcome-txt">Favourite teams</h1>
    <br />
    <br />
    <teams-page-card :teams="teams" class="centered" />
  </div>
</template>

<script>
import TeamsPageCard from "@/components/cards/TeamsPageCard";
// import userTeamService from '@/services/user/UserTeamService';
import teamService from "@/services/team/TeamService";

export default {
  name: "WatchTeamsPage",
  components: {
    TeamsPageCard
  },
  data() {
    return {
      teams: [],
      infoTeams: []
    };
  },

  created: async function() {
    try {
      // console.log('TEST ' + localStorage.getItem('username'))
      // let resp = await userTeamService.findAll();
      //     this.infoTeams = resp;

      // for(var i = 0; i < this.infoTeams._embedded.teamModelList.length; i++) {
      //     const team = {
      //         id: this.infoTeams._embedded.teamModelList[i].teamId,
      //         name: this.infoTeams._embedded.teamModelList[i].association.name,
      //         coach: this.infoTeams._embedded.teamModelList[i].coach.person.firstName,
      //         img: '',
      //         stadium: this.infoTeams._embedded.teamModelList[i].location.name,
      //         formed: '',
      //         description: this.infoTeams._embedded.teamModelList[i].association.description

      //     };
      //     this.teams.push(team);
      // }
      console.log("TEST " + localStorage.getItem("username"));
      let resp = await teamService.findAll();
      this.infoTeams = resp;

      for (var i = 0; i < this.infoTeams._embedded.teamModelList.length; i++) {
        const team = {
          id: this.infoTeams[i].teamId,
          name: this.infoTeams[i].association.name,
          coach: this.infoTeams[i].coach.person.firstName,
          img: "",
          stadium: this.infoTeams[i].location.name,
          formed: "",
          description: this.infoTeams[i].association.description
        };
        this.teams.push(team);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style>
.welcome-txt {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>