<template>
    <b-container class="parallax">
        <b-row>
            <b-col></b-col>
                <b-col cols="6">
                    <ul style="list-style-type:none">
                        <li v-for="goals in match" :key="goals.goaldId">
                            <goal-event :matchGoals="goals"/>
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
        },
        name: 'MatchEvent',

        data() {
            return {
                matchGoal : "",
                match: [],
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
