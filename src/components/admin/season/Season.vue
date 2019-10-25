<template>
    <b-container>
        <h1>Season</h1>
        <hr class="pretty">
        <b-row class="justify-content-center">
            <b-col cols="6">
                <add-season/>
            </b-col>
            <b-col cols="6">
                <update-season/>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

import AddSeason from '@/components/admin/season/AddSeason'
import UpdateSeason from '@/components/admin/season/UpdateSeason'

export default {
    name: "Season",

    components: {
        AddSeason,
        UpdateSeason
    }
    
}
</script>

<style>

</style>