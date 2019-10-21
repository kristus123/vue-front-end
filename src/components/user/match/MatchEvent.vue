<template>
    <b-container class="parallax">
        <b-row>
            <b-col></b-col>
            <b-col cols="8">
                <ul style="list-style-type:none">
                    <li v-for="goals in matchGoalsHome" :key="goals.goaldId">
                        <goal-event :matchGoals="goals" :opt="floatOptLeft"/>
                    </li>
                    <li v-for="goals in matchGoalsAway" :key="goals.goaldId">
                        <goal-event :matchGoals="goals" :opt="floatOptRight"/>
                    </li>
                </ul>
            </b-col>
            <b-col></b-col>
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
                floatOptLeft : "floatleft",
                floatOptRight : "floatright",
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

    .parallax {
        /* The image used */
        background-image: url('https://previews.123rf.com/images/moovstock/moovstock1701/moovstock170100864/70598792-close-up-of-waving-flag-with-real-madrid-c-f-football-club-logo.jpg');

        /* Full height */
        height: 100%; 

        /* Create the parallax scrolling effect */
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .floatleft {
        float:left;
    }
    .floatright {
        float:right;
    }

</style>
