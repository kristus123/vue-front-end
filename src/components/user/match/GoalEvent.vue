<template>
    <b-container class="bv-example-row" :class="opt" style="max-width: 370px;">
        <b-row>
            <b-col class="description" :class="eventOpt">
                <h5> <b> {{matchGoals.player.team.association.name}} scored a goal! </b> </h5>
                <b> Goal: {{matchGoals.player.playername}} ({{matchGoals.goalType.replace("_", " ").toLowerCase()}}) </b> <br>
                {{matchGoals.description}}
            </b-col>
        </b-row>
</b-container>
</template>

<script>
    export default {
        props: ["matchGoals"],
        data() {
            return {
                eventOpt : "",
                opt : ""
            }
        },
        beforeMount() {
            if(this.matchGoals.player.team.teamId == this.matchGoals.match.homeTeam.teamId) {
                this.opt = "floatright";
                this.eventOpt = "eventRight";
            }
            else {
                this.eventOpt = "eventLeft";
                this.opt = "floatleft";
            }
        }
    }
</script>

<style>

    .eventRight {
        padding: 1em;
        margin: 1em;
        background: rgba(18, 74, 255, 0.8);
        text-align: left;
    }

    .eventLeft {
        padding: 1em;
        margin: 1em;
        background: rgba(237, 181, 00, 0.8);
        text-align: left;
    }

    .floatleft {
        float:left;
    }

    .floatright {
        float:right;
    }

</style>