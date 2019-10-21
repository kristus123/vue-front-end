<template>
    <b-container class="bv-example-row">
  <b-row>
    <b-col class="event">
        {{matchGoals.player.team.association.name}} scored a goal! <br>
        Goal: {{matchGoals.player.playername}} ({{matchGoals.goalType.replace("_", " ").toLowerCase()}}) <br>
        {{matchGoals.description}} <br>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
    export default {
        props: ["matchGoals"]
    }
</script>

<style>

.event {
  padding: 1em;
  margin: 1em;
  background-color: #AACCFF;
}

</style>