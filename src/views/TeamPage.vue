<template>
    
    <b-container id="teamContainer" v-if="team !== null">
        <b-row class="justify-content-center">
           <h1><img id="logo" v-bind:src="team.img">{{team.name}}</h1>     
        </b-row>
        <b-card no-body>
            <b-tabs card justified>
                <b-tab title="Information" active>
                    <b-row>
                        <p><strong>Coach: </strong> {{team.coach}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Stadium: </strong> {{team.stadium}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Year formed: </strong> {{team.formed}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Description: </strong> {{team.description}}</p>
                    </b-row>
                </b-tab>
    
                <b-tab class="test" title="Players">
                    
                    <b-row>
                        <b-col cols="4" v-for="player in players" :key="player.playerId">
                            <player-card :playerAttr="player"/>
                        </b-col>
                    </b-row>
                     
                </b-tab>
                <b-tab title="Stats" v-if="teamStats !== null">
                    <ul>
                        <li>Players: {{teamStats.numberOfPlayers}}</li>
                       <li>Current season: {{teamStats.activeSeason.name}}</li>
                        <li>Total goals: {{teamStats.totalGoals}}</li>
                       <li>Player with most goals: {{teamStats.playerWithMostGoals.player.playername}} ({{teamStats.playerWithMostGoals.goals}})</li>
                    </ul>
                    
                </b-tab>
                <b-tab title="Recent Matches">
                    <recent-matches-list :teamId="teamId"/>
                </b-tab>
            </b-tabs>
        </b-card>
        
    </b-container>
</template>

<script>
import PlayerCard from '@/components/cards/player/PlayerCard';
import TeamService from '@/services/team/TeamService.js';
import RecentMatchesList from '@/components/lists/RecentMatchesList'

export default {
    name: "teamPage",
    props: ['teamId', 'teams'],
    components: {
        PlayerCard,
        TeamService,
        RecentMatchesList
    },

    data() {
        return {
            team: null,
            players: [],
            teamStats: []
        }
    },

    async created() {
        
        if(this.teams) {
            for(var i = 0; i < this.teams.length; i++) {
                if(this.teams[i].id === this.teamId) {
                    this.team = this.teams[i];
                }
            }
        }
        this.players = await TeamService.getAllPlayersOfTeam(this.team.id);
        this.teamStats = await TeamService.getTeamStats(this.team.id);
    }

}
</script>

<style>
.nav-tabs .nav-link, .nav-tabs .nav-link {
    color:rgb(133, 133, 133);
    border: solid 1px #e9ecef;
}

.nav-link:hover {
    color: rgb(65, 65, 65);
}

#logo{
    width: 20%;
    align-content: left;
}

#teamContainer {
 background: url("../assets/ball-field-grass-46792.jpg");
 background-size: cover;
 background-repeat: no-repeat;
    
}

</style>