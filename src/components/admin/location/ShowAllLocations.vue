<template>
<div>
    <h1>hei</h1>
</div>
  
</template>

<script>
import locationService from '@/services/location/LocationService.js';
export default {
    async beforeMount() {
        this.locations = await locationService.findAll();
    },

    methods: {
        data : function() {
            return {
                locations : []
            }
        }
    }

}
</script>

<style>

</style>