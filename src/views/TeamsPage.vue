<template>
    <teams-page-card :teams="teams" :infoTeams="infoTeams"/>
</template>

<script>

import TeamsPageCard from '@/components/cards/TeamsPageCard'
import axios from 'axios'

export default {
    name : "teamsPage",
    components : {
        TeamsPageCard
    },
    data() {
        return {
            teams : [
                { 
                    id : 1,
                    name : 'Juventus',
                    coach : 'someGuy'
                    //img : this.infoTeams[0].teams[0].strTeamBadge
                },
                { 
                    id : 2,
                    name : 'Arsenal',
                    coach : 'someGuy'
                    //img : this.infoTeams[1].teams[0].strTeamBadge
                },
                {
                    id : 3,
                    name : 'Inter',
                    coach : 'someGuy'
                   // img : this.infoTeams[2].teams[0].strTeamBadge
                },
                {
                    id : 4,
                    name : 'Manchester United',
                    coach : 'someGuy'
                   // img : this.infoTeams[3].teams[0].strTeamBadge
                },
                {
                    id : 5,
                    name : 'AC Milan',
                    coach : 'someGuy'
                   // img : this.infoTeams[4].teams[0].strTeamBadge
                }
            ],
            infoTeams : []
        }
    },

    created: async function () {
        try {
            let config = {
                headers: {
                    'Content-type' : 'application/json'
                }
            };
            for(var i = 0; i < this.teams.length; i++) {
                console.log(this.teams[i].name);
            const resp = await axios
                .get('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + this.teams[i].name)
                .then(resp => resp.data);
                this.infoTeams[i] = resp;
                
            }
            console.log(this.infoTeams[1].teams[0]);

        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style>

</style>