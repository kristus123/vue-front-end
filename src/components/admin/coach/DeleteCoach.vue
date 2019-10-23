<template>
  <div v-if="show===true">
    <li style="padding-top:30px;">
      <b-row>
        <b-col cols="8">
          <h2>{{team.association.name}}</h2>
        </b-col>
        <b-col>
          <b-button @click="removeAsCoach" variant="danger">Remove as coach {{show}}</b-button>
        </b-col>
      </b-row>
    </li>
  </div>
</template>

<script>
import coachService from "@/services/coach/CoachService.js";
export default {
  props: ["team"],
  data() {
    return {
      show: true
    };
  },
  methods: {
    async removeAsCoach() {
      //console.log(coachService.removeCoachFromTeam(this.team.teamId))
      if (await coachService.removeCoachFromTeam(this.team.teamId) === true) {
        this.show = false;
      }
    }
  }
};
</script>

<style>
</style>