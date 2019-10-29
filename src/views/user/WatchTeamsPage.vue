<template>
    <div>
        <br>
        <h1>Favourite teams</h1>
        <br>

        <b-container>
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                <b-form-group class="text-black" style="text-align: left;">
                    <b-input-group>
                        <b-form-select :options="teamOptions" v-model="selectedTeam" v-on:DropDownValue="onSelectedTeam"/>
                        <b-input-group-append>
                            <b-btn variant="primary" v-on:click="addTeam" :disabled="selectedTeam == null">Add</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                </b-col>
            </b-form-row>

            <!-- <b-row id="showSuccessMsg" class="justify-content-center">
                <b-col cols="7">
                    <b-alert variant="success" show>You have successfully added a player</b-alert>
                </b-col>
            </b-row>

            <b-row id="showErrorMsg" class="justify-content-center">
                <b-col cols="7">
                    <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                </b-col>
            </b-row> -->

        </b-container>

        <br>
        <br>

        <teams-page-card :teams="teams" />

    </div>
</template>

<script>

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from '@/components/forms/FormSelect'

import TeamsPageCard from '@/components/cards/TeamsPageCard'
import teamService from '@/services/team/TeamService';
import userTeamService from '@/services/user/UserTeamService';


export default {
    name : "WatchTeamsPage",
    components : {
        FlexibleForm,
        FormSelect,
        TeamsPageCard
    },
    data() {
        return {
            textColor: "text-black",
            image: require(`@/assets/action-adult-athlete-1311619.jpg`),
            selectedTeam: null,
            removeTeam: null,

            teams : [], // teams in my own watchlist
            infoTeams : [],
            teamOptions: [] // teams in the whole system

        }
    },
    
    created: async function () { // find my fav teams
        try {
            // let resp = await userTeamService.findAll(); // this is what we want
            let resp = await teamService.findAll(); // hack for demo purposes
                this.infoTeams = resp;

            //console.log(this.infoTeams);

            for(var i = 0; i < this.infoTeams.length; i++) {
                const player = {
                    id: this.infoTeams[i].teamId,
                    stadium: this.infoTeams[i].location.name,
                    coach: this.infoTeams[i].coach.person.firstName,
                    description: this.infoTeams[i].association.description,
                    name: this.infoTeams[i].association.name,
                    formed: '2000'

                };
                if (i % 3 == 0) this.teams.push(player); // hack for demo purposes
            }
        } catch (error) {
            console.error(error);
        }
    },
    mounted: function() {
        // document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        // document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },
    beforeMount: async function() { // find teams from the system that are NOT in fav list


        let allTeams = await teamService.findAll();
        let teamOption = [];

        //Populating the player options for the dropdown
        if(allTeams.length === 0) {
            teamOption[0] = {
            value: null,
            text: 'No teams available!',
            disabled: true
            }
        } else {

            for(var i = 0; i < allTeams.length; i++) {
                if(i === 0) {
                    teamOption[i] = {
                        value: null,
                        text: 'Please select a team',
                        disabled: true
                    }
                } else if (!this.teams.some(item => item.teamId ===  allTeams[i].teamId)) {

                    teamOption[i+1] = {
                        value: allTeams[i],
                        text: allTeams[i].association.name
                    }
                }
            }
        }

        this.teamOptions = teamOption;
    },
    methods: {
      
        onSelectedTeam(value) {
            this.selectedTeam = value;
        },
        onRemoveTeam(value) {
            this.removeTeam = value;
        },
        async addTeam() {
            let teamObject = {
                teamId: this.selectedTeam.teamId,
            }
            console.log("TEAM BANANANANANANANAN");
            let response = await userTeamService.add(teamObject);
            // if(response.status === 201) {
            //     // this.$delete(this.players, this.players.indexOf(this.selectedTeam)); // how to do??
            //     // this.printMsg('showSuccessMsg');
            // } else {
            //     // this.printMsg('showErrorMsg');
            // }
        },
        async removeTeam() {
            let response = await userTeamService.deleteTeam(this.removeTeam.teamId);
            // if (response.status === 201) {
            //     
            // }
        }
    }

}
</script>

<style>
.welcome-txt-team {
    position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-team {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>