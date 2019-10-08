<template>
    <b-container>
        <b-card
            title="Ronaldo"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <b-row class="justify-content-center">
                <div class="b-card-image">
                    <img src="https://img.etimg.com/thumb/msid-67641060,width-1200,height-900,resizemode-4,imgsize-18028/cristiano-ronaldo.jpg" alt="avatar" class="player-image">
                </div>
            </b-row>
            <b-row>
                <b-col>{{teamName}}</b-col>
                <b-col>{{playerPosition}}</b-col>
                <b-col>NO. {{playerNumber}}</b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col>Season Goals</b-col>
                <b-col>Total Goals</b-col>
            </b-row>
            <b-row>
                <b-col>{{playerSeasonGoals}}</b-col>
                <b-col>{{playerTotalGoals}}</b-col>
            </b-row>
            <b-row class= "row-margin">
                <b-col>Sum stats</b-col>
                <b-col>Sum stats</b-col>
            </b-row>

        </b-card>
    </b-container>
</template>

<script>
export default {
    
    
    
    data() {
        return {
            teamName : "Juventus",
            playerPosition: "Attacker",
            playerNumber: "7",
            playerSeasonGoals:"40",
            playerTotalGoals:"300"
        }
    }

    
}
</script>

<style>
    .b-card-image {
        width: 100px;
        height: 100px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
    }
    .player-image {
        display: inline;
        margin: 0 auto;
        height: 100%;
        width: auto;
    }
    .center {
        margin: auto;
        width: 50%;
        padding: 10px;
    }

    .row-margin {
        margin-top:30px;
    }
</style>