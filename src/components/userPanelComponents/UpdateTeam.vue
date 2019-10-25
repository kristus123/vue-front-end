<template>
  <div>
      <h1>update team</h1>
      {{team}}
  </div>
</template>

<script>
import teamService from '@/services/team/TeamService'
export default {
    async beforeMount() {
        this.team = await teamService.findById(this.$route.params.teamId);

    },
    data() {
        return {
            team : null
        }
    }

}
</script>

<style>

</style>