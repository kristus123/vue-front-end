<template>
    <b-container>
        <b-row>
            <b-col class = "b-col-border">
                <ul style="list-style-type:none">
                    <li v-for="(goals, index) in matchGoalsHome" :key="index">
                        <goal-event :matchGoals="goals"/>
                    </li>
                </ul>
            </b-col>
            <b-col>
                <ul style="list-style-type:none">
                    <li v-for="(goals, index) in matchGoalsAway" :key="index">
                        <goal-event :matchGoals="goals"/>
                    </li>
                </ul>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import matchGoalService from '@/services/MatchGoal/MatchGoalService.js';
import matchService from '@/services/Match/MatchService.js';
import GoalEvent from "@/components/user/match/GoalEvent";
    export default {
        props: ['matchId'],
        components: {
            GoalEvent
        },
        async beforeMount() {
            this.match = await matchGoalService.getMatchGoalByMatchId(1);
            this.sortTeams();
        },
        name: 'MatchEvent',

        data() {
            return {
                matchGoal : "",
                match: [],
                matchGoalsHome: [],
                matchGoalsAway: []
            }
        },
        methods: {
            sortTeams() {
                for(var i = 0; this.match.length; i++) {
                    if(this.match[i].player.team.teamId == this.match[i].match.homeTeam.teamId) {
                        this.matchGoalsHome.push(this.match[i]);
                    }
                    else {
                        this.matchGoalsAway.push(this.match[i]);
                    }
                }
            }   
        }
    }
</script>

<style>

.b-col-border {
        border-right: 2px dashed;
    }

</style>
