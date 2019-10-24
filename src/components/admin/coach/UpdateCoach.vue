<template>
  <div>
    <hr class="pretty" />
    <p style="color:grey;">the best coach to ever walk on this planet</p>
    <!-- <p>owner:</p> -->
    <h3 v-if="coach !== null">{{coach + " " + coach}}</h3>
    <p>🏅🏅🏅</p>
    <hr class="pretty" />
    <hr />

    <b-row>
      <b-col>Teams with no coaches</b-col>
      <b-col>
        <b-card>
          <h1>hi</h1>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import GenericCard from '@/components/cards/reusables/GenericCard'
import teamService from '@/services/team/TeamService';
export default {
  beforeMount() {

  },

  data() {
    return {
      coach : {},
      teamsWithNoCoach: [],
      coachTeams : []
    }
  }
  // components: {GenericCard}
};
</script>

<style>
</style>