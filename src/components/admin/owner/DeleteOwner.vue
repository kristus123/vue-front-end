<template>
  <div v-if="show">
    <li>
      <b-row>
        <b-col>{{team.association.name}}</b-col>
        <b-col>
          <b-button @click="removeOwner" variant="danger">Sell
            ♥
          </b-button>
        </b-col>
      </b-row>
    </li>
  </div>
</template>

<script>
import teamService from "@/services/team/TeamService.js";
export default {
    data() {
        return {
            show : true
        }
    },
  props: ["team"],
  methods: {
    removeOwner() {
      teamService.removeOwner(this.team.teamId);
      this.show = false
      this.$emit('update', true);
    }
  }
};
</script>

<style>
</style>