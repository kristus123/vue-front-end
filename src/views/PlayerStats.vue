<template>
<b-container>
    <b-row class="justify-content-center">
        <b-col cols="6">
            <player-stats-line />
        </b-col>
        <b-col cols="6">
            <player-stats-bar />
        </b-col>
    </b-row>
    <b-row class="justify-content-center">
        <b-col cols="6">
            <player-stats-pie />
        </b-col>
        <b-col cols="6">
            <player-stats-bar />
        </b-col>
    </b-row>

    <b-row>
        <h2>{{showMsg}}</h2>
    </b-row>
</b-container>
</template>

<script>

import PlayerStatsLine from '@/components/charts/player/playerStatsLine'
import PlayerStatsBar from '@/components/charts/player/playerStatsBar'
import PlayerStatsPie from '@/components/charts/player/playerStatsPie'

export default {
    name : "playerStats",
    components: {
        PlayerStatsLine,
        PlayerStatsBar,
        PlayerStatsPie
    }
    
}
</script>

<style>

</style>