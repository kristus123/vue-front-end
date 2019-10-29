<template>
  <div v-if="show">
    <generic-card
      :deleteUrl="`/admin/delete/team/${team.teamId}`"
      :updateUrl="`/admin/update/team/${team.teamId}`"
    >
      <template v-slot:left>
        <b-button v-b-modal="`team-${team.teamId}`" variant="outline-danger">delete</b-button>
      </template>
      <h1>{{team.association.name}}</h1>
    </generic-card>

    <b-modal centered :hide-footer="true" :hide-header="true" size="lg" :id="`team-${team.teamId}`">
      <center>
        <hr class="pretty" />
        <h3>Are you sure you want to delete {{team.association.name}}</h3>
        <b-button variant="danger" @click="deleteTeam" >DELETE</b-button>
        <hr class="pretty" />
      </center>
    </b-modal>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
import teamService from "@/services/team/TeamService";
export default {
  data() {
    return {
      show: true
    };
  },
  props: ["team"],
  components: { GenericCard },
  methods: {
    async deleteTeam() {
      console.log(await teamService.deleteTeam(this.team.teamId));
      this.show = false;
    }
  }
};
</script>

<style>
</style>