<template>
  <div>
    <center>
    <h1>all coaches</h1>

    <div v-for="coach in coaches" v-bind:key="coach.coachId">
      <coach-card :coach="coach" />
    </div>
    </center>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
import coachService from "@/services/coach/CoachService.js";
import CoachCard from '@/components/admin/coach/CoachCard'
export default {
  components: { GenericCard, CoachCard },
  methods: {
    async findAll() {
    
      this.coaches = await coachService.findAll();
    }
  },
  beforeMount() {
    this.findAll();
  },
  data() {
    return {
      coaches: []
    };
  }
};
</script>

<style>
</style>