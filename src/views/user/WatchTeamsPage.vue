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
                        <b-form-select :options="teamToAddOptions" v-model="selectedTeam" v-on:DropDownValue="onSelectedTeam"/>
                        <b-input-group-append>
                            <b-btn variant="primary" v-on:click="addTeam" :disabled="selectedTeam == null">Add</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                </b-col>
            </b-form-row>

            <!-- <b-row id="showSuccessMsg" class="justify-content-center">
                <b-col cols="7">
                    <b-alert variant="success" show>You have successfully added a team</b-alert>
                </b-col>
            </b-row>

            <b-row id="showErrorMsg" class="justify-content-center">
                <b-col cols="7">
                    <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                </b-col>
            </b-row> -->

        </b-container>

        <!-- <b-container>
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                <b-form-group class="text-black" style="text-align: left;">
                    <b-input-group>
                        <b-form-select :options="teamToRemoveOptions" v-model="deletedTeam" v-on:DropDownValue="onRemoveTeam"/>
                        <b-input-group-append>
                            <b-btn variant="primary" v-on:click="removeTeam" :disabled="deletedTeam == null">Delete</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                </b-col>
            </b-form-row>
        </b-container> -->

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
            deletedTeam: null,

            teams : [], // teams in my own watchlist
            infoTeams : [],
            teamToAddOptions: [], // teams in the whole system, exept the ones in my watchlist
            teamToRemoveOptions: []
        }
    },
    
    created: async function () { // find my fav teams
        try {
            // let resp = await userTeamService.findAll(); // this is what we want
            let resp = await teamService.findAll(); // hack for demo purposes
                this.infoTeams = resp;

            let teamToRemoveOption = [];

            //console.log(this.infoTeams);

            teamToRemoveOption[0] = {
                value: null,
                text: 'Please select a team',
                disabled: true
            }

            for(var i = 0; i < this.infoTeams.length; i++) {
                const team = {
                    id: this.infoTeams[i].teamId,
                    stadium: this.infoTeams[i].location.name,
                    coach: this.infoTeams[i].coach.person.firstName,
                    description: this.infoTeams[i].association.description,
                    name: this.infoTeams[i].association.name,
                    formed: '2000'

                };

                if (i % 3 === 0) {
                    teamToRemoveOption[i+1] = {
                        value: this.infoTeams[i],
                        text: this.infoTeams[i].association.name
                    };
                    this.teams.push(team); // hack for demo purposes
                }
            }

            if (this.teams.length === 0) {
                teamToRemoveOption[0] = {
                    value: null,
                    text: 'No teams available!',
                    disabled: true
                }
            }

            this.teamToRemoveOptions = teamToRemoveOption;

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

        //Populating teamOptions for the dropdown

        teamOption[0] = {
            value: null,
            text: 'Please select a team',
            disabled: true
        }
        for(var i = 0; i < allTeams.length; i++) {
            if (!this.teams.some(item => (item.id === allTeams[i].teamId))) {
                //console.log("TESTING ALLTEAMS: " + allTeams[i].teamId + " " + allTeams[i].association.name)
                teamOption[i+1] = {
                    value: allTeams[i],
                    text: allTeams[i].association.name
                }
            }
        }

        if (teamOption.length === 1) {
            teamOption[0] = {
                value: null,
                text: 'No teams available!',
                disabled: true
            }
        }
        

        this.teamToAddOptions = teamOption;
    },
    methods: {
      
        onSelectedTeam(value) {
            this.selectedTeam = value;
        },
        onRemoveTeam(value) {
            this.deletedTeam = value;
        },
        async addTeam() {
            let teamObject = {
                teamId: this.selectedTeam.teamId,
            }
            console.log("Trying to add teamId=" + this.selectedTeam.teamId)
            let response = await userTeamService.add(teamObject);
            if(response.status === 201) {
                // this.$delete(this.players, this.players.indexOf(this.selectedTeam)); // how to do??
                //this.printMsg('showSuccessMsg');
                console.log("added successfully")
                // const team = {
                //     id: response.data.teamId,
                //     stadium: response.data.location.name,
                //     coach: response.data.coach.person.firstName,
                //     description: response.data.association.description,
                //     name: response.data.association.name,
                //     formed: '2000'

                // };
                // this.teams.push(team);

                // const teamToRemoveOptiom = {
                //     value: response.data,
                //     text: response.data.association.name
                // }

                // this.teamToRemoveOptions.push(teamToRemoveOption);

            } else {
                //this.printMsg('showErrorMsg');
                console.log(response.status)
            }
        },
        async removeTeam() {
            console.log("Trying to delete teamId=" + this.deletedTeam.teamId)
            let response = await userTeamService.deleteTeam(this.deletedTeam.teamId);
            if (response.status === 200) {
                console.log("removed successfully")
            }
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