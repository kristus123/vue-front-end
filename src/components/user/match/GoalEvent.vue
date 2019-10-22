<template>
    <b-container class="bv-example-row" :class="opt" style="max-width: 370px;">
        <b-row>
            <b-col class="description" :class="eventOpt">
                <h5> <b> {{matchGoals.player.team.association.name}} scored a goal! </b> </h5>
                <b>  Goal:  <span v-bind:id="hooverId"> {{matchGoals.player.playername}} </span> ({{matchGoals.goalType.replace("_", " ").toLowerCase()}}) </b> <br>
                {{matchGoals.description}}
                
                <b-popover v-bind:target="hooverId"  triggers="hover" placement="right" boundary-padding = 0 boundary= 'viewport'>
                    <player-card :playerAttr="matchGoals.player"/>
                </b-popover>
            </b-col>
        </b-row>
</b-container>
</template>

<script>
    import PlayerCard from '@/components/cards/player/PlayerCard';
    export default {
        props: ["matchGoals"],
        components: {PlayerCard},
        data() {
            return {
                eventOpt : "",
                opt : "",
                hooverId : "yupp"
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
            this.hooverId = this.matchGoals.goalId.toString(10);
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

    .b-popover {
        max-width: 100%;
    }

</style>