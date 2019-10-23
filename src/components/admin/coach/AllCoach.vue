<template>
  <div>
    <div v-for="coach in coaches" v-bind:key="coach.coachId">
      {{coach}}
      <generic-card :updateUrl="`/admin/update/coach/${coach.coachId}`">
        <h1>{{coach.person.firstName + " " + coach.person.lastName}}</h1>

        <h1>hei</h1>
      </generic-card>
    </div>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
import coachService from "@/services/coach/CoachService.js";

export default {
  components: { GenericCard },
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