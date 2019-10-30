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
                    <div class="list-type1">
<ol>
    <li><a href="#">Players: {{teamStats.numberOfPlayers}} </a></li>
<li><a href="#"><li>Current season: {{teamStats.activeSeason.name}}</li></a></li>
<li><a href="#"><li>Total goals: {{teamStats.totalGoals}}</li></a></li>
<li><a href="#">Player with most goals: {{teamStats.playerWithMostGoals.player.playername}} ({{teamStats.playerWithMostGoals.goals}})</a></li>
</ol>
</div>
                    
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

.list-type1{
width:400px;
margin:0 auto;
}

.list-type1 ol{
counter-reset: li;
list-style: none;
*list-style: decimal;
font-size: 15px;
font-family: 'Raleway', sans-serif;
padding: 0;
margin-bottom: 4em;
}
.list-type1 ol ol{
margin: 0 0 0 2em;
}

.list-type1 a{
position: relative;
display: block;
padding: .4em .4em .4em 2em;
*padding: .4em;
margin: .5em 0;
background: #93C775;
color: #000;
text-decoration: none;
-moz-border-radius: .3em;
-webkit-border-radius: .3em;
border-radius: 10em;
transition: all .2s ease-in-out;
}

.list-type1 a:hover{
background: #d6d4d4;
text-decoration:none;
transform: scale(1.1);
}

.list-type1 a:before{
content: counter(li);
counter-increment: li;
position: absolute;
left: -1.3em;
top: 50%;
margin-top: -1.3em;
background:#93C775;
height: 2em;
width: 2em;
line-height: 2em;
border: .3em solid #fff;
text-align: center;
font-weight: bold;
-moz-border-radius: 2em;
-webkit-border-radius: 2em;
border-radius: 2em;
color:#FFF;
}

</style>