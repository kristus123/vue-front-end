<template>
  <div>
    <generic-card :updateUrl="`/admin/update/location/${location.locationId}`">
      <h3>{{location.name}}</h3>
      <hr class="pretty" />
      <h5>"{{location.description}}"</h5>
      <slot />
    </generic-card>
  </div>
</template>

<script>
import GenericCard from "@/components/cards/reusables/GenericCard";
export default {
    components : {GenericCard},
    props: ['location']
};
</script>

<style>
</style>