<template>
    <b-container class="bv-example-row" :class="opt" style="max-width: 370px;">
        <b-row>
            <b-col class="description" :class="eventOpt">
                {{matchGoals.player.team.association.name}} scored a goal! <br>
                Goal: {{matchGoals.player.playername}} ({{matchGoals.goalType.replace("_", " ").toLowerCase()}}) <br>
                {{matchGoals.description}} <br>
            </b-col>
        </b-row>
</b-container>
</template>

<script>
    export default {
        props: ["matchGoals", "opt"],
        data() {
            return {
                eventOpt : ""
            }
        },
        beforeMount() {
            if(this.opt == "floatright")
                this.eventOpt = "eventRight";
            else
                this.eventOpt = "eventLeft";
        }
    }
</script>

<style>

    .eventRight {
        padding: 1em;
        margin: 1em;
        background-color: rgb(29, 93, 212);
    }

    .eventLeft {
        padding: 1em;
        margin: 1em;
        background-color: #AACCFF;
    }

    .floatleft {
        float:left;
    }

    .floatright {
        float:right;
    }

</style>