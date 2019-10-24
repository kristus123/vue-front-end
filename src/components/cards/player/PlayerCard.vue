<!-- This component requires that the parents passes a PLAYERMODEL object. 
This is grande importante, as e.g. playerDTO would not work. -->

<template>
        
        <b-card
            v-bind:title="playerName"
            align = "center"
            tag="article"
            class="mb-2">
            <b-row class="justify-content-center">
                <div class="b-card-image">
                    <img v-bind:src="imageUrl" alt="avatar" class="player-image">
                </div>
            </b-row>

                
            <b-row class="row-below-img">
                <b-col>{{teamName}}</b-col>
                <b-col>{{playerPosition}}</b-col>
                <b-col>NO. {{playerNumber}}</b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col> 
                    <b-row>
                        <b-col><i class="far fa-futbol fa-2x vertical-center"></i></b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-right">
                                    Season
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col class="text-right">
                                    {{playerSeasonGoals}}
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col> 
                    <b-row>
                        <b-col><i class="far fa-futbol fa-2x vertical-center"></i></b-col>
                        <b-col>
                            <b-row>
                                <b-col class="text-right">
                                    Lifetime
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col class="text-right">
                                    {{playerTotalGoals}}
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class= "row-margin">
                <b-col>
                    <player-stats-bar :width="100" :height="100" :chartdata="chartdataBar" :options="barOptions" />
                    <font color="#f87979">Goal per match</font>
                </b-col>
                <b-col>
                    <player-stats-pie :width="100" :height="100" :chartdata="chartData" :options="pieOptions"/>
                    <font color="33ff4">Goal types</font>
                </b-col>
            </b-row>
            
            <slot />    
        </b-card>
    
</template>

<script>
import PlayerStatsBar from '@/components/charts/player/playerStatsBar';
import PlayerStatsPie from '@/components/charts/player/playerStatsPie';
import playerService from '@/services/player/PlayerService.js'

export default {

    name: 'PlayerCard',
    props:["playerAttr"],
    
    components: {
        PlayerStatsBar,
        PlayerStatsPie,
        playerService
    },

    async beforeMount() {
        this.goals = await playerService.getPlayerGoals(this.playerAttr.playerId);
        this.stats = await playerService.getPlayerStats(this.playerAttr.playerId);

        this.setPieChart();
        this.setPlayerData();
        
            
    },
    

    methods: {
        setPieChart() {
            

            var new_label = new Array();
            var new_nums = new Array();
            for(let key in this.stats.data.goalTypes) {
                if(this.stats.data.goalTypes.hasOwnProperty(key)) {
                    new_label.push(key.toLowerCase().replace("_", " "));
                    new_nums.push(this.stats.data.goalTypes[key]);
                    
                }
            }
            this.chartData.datasets[0].data = new_nums;
            this.chartData.labels = new_label;
        },
        setPlayerData() {
            this.playerPosition = this.playerAttr.normalPosition;
            this.playerNumber = this.playerAttr.playerNumber;
            this.teamName = this.playerAttr.team.association.name;
            this.playerName = this.playerAttr.playername;
            this.imageUrl = this.playerAttr.imageUrl;

            this.chartdataBar.datasets[0].data[0] = this.stats.data.averageGoal;
            this.playerTotalGoals = this.stats.data.totalGoals;
            this.playerSeasonGoals = this.stats.data.seasonGoals;
        }
    },
    
    data() {
        return {
            playerName : "Ronaldo",
            teamName : "Juventus",
            playerPosition: "Attacker",
            playerNumber: "7",
            imageUrl: "",
            goals: "",
            stats: "",
            playerSeasonGoals:"40",
            playerTotalGoals:"300",
            chartdataBar: {
                //Data to be represented on x-axis
                labels: ['Ronaldo', 'Other'],
                datasets: [
                    {
                        label: 'Goals',
                        backgroundColor: ['#f87979' , '#a87979'],
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#249EBF',
                        //Data to be represented on y-axis
                        data: [1.3,0.8]
                    }
                ]
            },
            //Chart.js options that controls the appearance of the chart
            barOptions: {
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
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
            chartData: {
                //Data to be represented on x-axis
                labels: ["pip", "dick"],
                datasets: [
                    {
                        label: 'Goal types',
                        backgroundColor: ['#33ff41', '#39af41', '#b9af41'] ,
                        pointBackgroundColor: 'white',
                        borderWidth: 1,
                        pointBorderColor: '#249EBF',
                        //Data to be represented on y-axis
                        data: [2]
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
        margin-top:50px;
    }
    .row-below-img {
        margin-top: 15px;
    }
    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .align-text-right {
        text-align: right;
    }
    .b-card-header-clazz {
        text-align: center;
        align-items: center;
    }
</style>