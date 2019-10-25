<template>
  <div>
    <!-- <hr class="pretty" /> -->
    <!-- {{teamsWithNoCoach}} -->
    <p style="color:grey;">the best coach to ever walk on this planet</p>
    <!-- <p>owner:</p> -->
    <!-- {{coach.person}}   -->
    <h3 v-if="coach !== null">{{coach.person.firstName + " " + coach.person.lastName}}</h3>
    <p>🏅🏅🏅</p>
    <hr class="pretty" />
    <hr />

    <b-row>
      <b-col>
        <h3>Teams that are looking for a coach</h3>
          <!-- {{teamsWithNoCoach}} -->
          <div v-for="team in teamsWithNoCoach" >
            
            <b-card style="margin-top:20px;">
            <h3>{{team.association.name}}</h3>
            <b-button @click="() => turnIntoCoach(team.teamId)">turn into coach for this team</b-button>
          </b-card>

          </div>
      </b-col>
      <b-col>
        <h3>Currently coaching</h3>
        <div v-for="team in coachTeams" v-bind:key="team.teamId">
          <b-card style="margin-top:20px;">
            <h3>{{team.association.name}}</h3>
            <b-button @click="() => removeAsCoach(team.teamId)">Remove as coach from this team</b-button>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import GenericCard from '@/components/cards/reusables/GenericCard'
import teamService from "@/services/team/TeamService";
import coachService from "@/services/coach/CoachService";
// import teamService from '@/services/team/TeamService'
export default {
  async beforeMount() {
    this.teamsWithNoCoach = await teamService.findTeamsWithNoCoach();
    this.coachTeams = await coachService.findAllTeamsThatHasCoach(this.$route.params.coachId);

    this.coach = await coachService.findById(this.$route.params.coachId);
    this.teamsWithNoCoach = await teamService.findTeamsWithNoCoach();

  },

  methods: {
    async removeAsCoach(teamId) {

      
      for (let i = 0; i < this.coachTeams.length; i++) {
        if (this.coachTeams[i].teamId === teamId) {
          this.coachTeams.splice(i, 1);
        }
      }


      this.teamsWithNoCoach.push(await coachService.removeCoachFromTeam(teamId)) 

    },
    async turnIntoCoach(teamId) {
      
      for (let i = 0; i < this.teamsWithNoCoach .length; i++) {
        console.log(this.teamsWithNoCoach[i].teamId === teamId)
        if (this.teamsWithNoCoach[i].teamId === teamId) {
          this.teamsWithNoCoach.splice(i, 1);
        }
      }

      const teamObject = await coachService.update(this.$route.params.coachId, teamId);
      this.coachTeams.push(teamObject)
      
    }
  },
  data() {
    return {
      coach: {},
      teamsWithNoCoach: null,
      coachTeams: null
    };
  }
};
</script>

<style>
</style>