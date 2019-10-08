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
                <b-col><player-stats-bar :width="100" :height="100" :chartdata="chartdata" :options="barOptions" /></b-col>
                <b-col><player-stats-pie :width="100" :height="100" :chartdata="pieDataCollection" :options="pieOptions"/></b-col>
            </b-row>
        </b-card>
    </b-container>
    
</template>

<script>
import PlayerStatsBar from '@/components/charts/player/playerStatsBar';
import PlayerStatsPie from '@/components/charts/player/playerStatsPie';

export default {
    
    components: {
        PlayerStatsBar,
        PlayerStatsPie
    },
    
    data() {
        return {
            teamName : "Juventus",
            playerPosition: "Attacker",
            playerNumber: "7",
            playerSeasonGoals:"40",
            playerTotalGoals:"300",
            chartdata: {
            //Data to be represented on x-axis
            labels: ['Ronaldo', 'Other'],
            datasets: [
                {
                label: 'Goals',
                backgroundColor: '#f87979',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',
                //Data to be represented on y-axis
                data: [10,20]
                }
            ]
            },
            //Chart.js options that controls the appearance of the chart
            barOptions: {
            scales: {
                yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    display: false
                }
                }],
                xAxes: [ {
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false
                }
                }]
            },
            legend: {
                display: false
            },
            responsive: false,
            maintainAspectRatio: false
            },
            // --------------- PIE DATA AND OPTIONS ---------------
            pieDataCollection: {
                //Data to be represented on x-axis
                labels: ['Penalty', 'Header', 'Free-kick'],
                datasets: [
                    {
                    label: 'Goal types',
                    backgroundColor: ['#33ff41', '#39af41', '#b9af41'] ,
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    //Data to be represented on y-axis
                    data: [10, 20, 30]
                    },
                    
                ],
                
            },
            pieOptions: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false
            }
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