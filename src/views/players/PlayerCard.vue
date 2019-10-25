<template>
    <b-container>
        <h1>dasd</h1>
    </b-container>
</template>

<script>
import PlayerCard from "@/components/cards/player/PlayerCard";
import matchGoalService from '@/services/matchGoal/MatchGoalService.js';
export default {
    name: "playerCard",
    components: {
        PlayerCard
    },
    async beforeMount() {
            this.match = await matchGoalService.getMatchGoalByMatchId(1);
            console.log("dsad")
    },
    data() {
        return {
            match: []
        }
    }
}
</script>

<style>

</style>