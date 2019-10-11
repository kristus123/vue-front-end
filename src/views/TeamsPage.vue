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
                    name : 'Arsenal',
                    coach : 'someGuy',
                    img : '',
                    stadium : '',
                    formed : '',
                    description: ''
                },
                { 
                    id : 2,
                    name : 'Liverpool',
                    coach : 'someGuy',
                    img : '',
                    stadium : '',
                    formed : '',
                    description: ''
                },
                {
                    id : 3,
                    name : 'Inter',
                    coach : 'someGuy',
                    img : '',
                    stadium : '',
                    formed : '',
                    description: ''
                },
                {
                    id : 4,
                    name : 'Manchester United',
                    coach : 'someGuy',
                    img : '',
                    stadium : '',
                    formed : '',
                    description: ''
                },
                {
                    id : 5,
                    name : 'Barcelona',
                    coach : 'someGuy',
                    img : '',
                    stadium : '',
                    formed : '',
                    description: ''
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
                this.teams[i].img = this.infoTeams[i].teams[0].strTeamBadge;
                this.teams[i].stadium = this.infoTeams[i].teams[0].strStadium;
                this.teams[i].formed = this.infoTeams[i].teams[0].intFormedYear;
                this.teams[i].description = this.infoTeams[i].teams[0].strDescriptionEN;
                console.log(this.teams[i]);
                
            }
            

        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style>

</style>