<template>
  <div>
    <div v-for="team in teams" v-bind:key="team.id">
      <team-card :team="team" />
    </div>

  </div>
</template>

<script>
import teamService from '@/services/team/TeamService'
import TeamCard from '@/components/userPanelComponents/TeamCard';
export default {
  components : {TeamCard},
  async beforeMount() {
    this.teams = await teamService.findAll()
  },
  data() {
    return {
      teams : []
    }
  },

}
</script>

<style>
</style>