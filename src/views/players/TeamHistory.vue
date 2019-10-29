<template>
  <div>
    <b-card>
      <h1>{{teamObject.association.name}}</h1>
      <hr class="pretty" />

      <h4>from</h4>
      <strong>
        <h5>{{team.teamDateFrom}}</h5>
      </strong>
      <hr style="max-width:20%;">
      <h4>to</h4>
      <strong>
        <h5>{{team.teamDateTo}}</h5>
      </strong>
    </b-card>
  </div>
</template>

<script>
import TeamService from "@/services/team/TeamService";
export default {
  async beforeMount() {
    this.teamObject = await TeamService.findById(this.team.teamId);
  },
  data() {
    return {
      teamObject: null
    };
  },
  props: ["team"]
};
</script>

<style>
</style>