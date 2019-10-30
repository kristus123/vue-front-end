<template>
<div>
     <b-spinner v-if="loading" variant="primary" type="grow" label="Spinning"></b-spinner>
    <teams-page-card :teams="teams"/>
</div>
</template>

<script>

import TeamsPageCard from '@/components/cards/TeamsPageCard'
import TeamService from '@/services/team/TeamService.js'

import axios from 'axios'

export default {
    name : "teamsPage",
    components : {
        TeamsPageCard,
        TeamService,
    },
    data() {
        return {
            loading: true,
            dbTeams: [],
            teams : [],
            infoTeams : []
        }
    },

    beforeMount: async function () {
        this.dbTeams = await TeamService.findAll();
        try {
            for(var i = 0; i < this.dbTeams.length; i++) {
                var team = this.dbTeams[i];
                const resp = await axios
                    .get('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + team.association.name)
                    .then(resp => resp.data);
                this.infoTeams[i] = resp;

                var teamObj = {
                    id: team.teamId,
                    name: team.association.name,
                    coach: team.coach.person.firstName + " " + team.coach.person.lastName,
                    img: this.infoTeams[i].teams[0].strTeamBadge,
                    stadium: team.location.name,
                    formed: this.infoTeams[i].teams[0].intFormedYear,
                    description: team.association.description
                };
                this.teams.push(teamObj);
                this.loading = false;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style>

</style>