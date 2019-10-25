<template>
  <div>
    <generic-card :updateUrl="`/admin/update/owner/${owner.ownerId}`">
      <h3>{{owner.person.firstName}} {{owner.person.lastName}}</h3>
      <slot />
    </generic-card>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
// import coachService from "@/services/coach/CoachService.js";
export default {
  components: { GenericCard },

  props: ["owner"]
};
</script>

<style>
</style>