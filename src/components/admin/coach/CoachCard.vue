<template>
  <div>
    <generic-card :updateUrl="`/admin/update/coach/${coach.coachId}`">
      <h3>{{coach.person.firstName + " " + coach.person.lastName}}</h3>
      <hr class="pretty" />

      <ul v-if="teams.length !== 0">
        <p>currently coaching</p>
        <li v-for="team in teams" v-bind:key="team.teamId">
          <h5>{{team.association.name}}</h5>
        </li>
      </ul>
      <div v-else>
        <h3>currently not coaching any team</h3>
      </div>
      <slot />
    </generic-card>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
import coachService from "@/services/coach/CoachService.js";
export default {
  async beforeMount() {
    this.teams = await coachService.findAllTeamsThatHasCoach(
      this.coach.coachId
    );
  },
  data() {
    return {
      teams: []
    };
  },
  components: { GenericCard },
  props: ["coach"]
};
</script>

<style>
</style>