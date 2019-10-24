<template>
    <b-container>
        <h1>Update a player</h1>
        <flexible-form :image="image" :inputs="inputs" :color="textColor" @clicked="submitForm" >

            <template v-slot:firstDropdown>
                <b-form-row class="justify-content-center">
                    <b-col cols="8">
                    <b-form-group class="text-black" label="Pick a player" style="text-align: left;">
                        <b-input-group>
                        <form-select :options="playerOptions" :preselect="playerPreselect" v-on:DropDownValue="onSelectedPlayer"/>
                        </b-input-group>
                    </b-form-group>
                    </b-col>
                </b-form-row>
            </template>

            <template v-slot:teamDropdown>
                <b-form-row class="justify-content-center">
                    <b-col cols="8">
                    <b-form-group class="text-black" label="Pick a team" style="text-align: left;">
                        <b-input-group>
                        <form-select :options="teamOptions" :preselect="teamPreselect" v-on:DropDownValue="onSelectedTeam"/>
                        </b-input-group>
                    </b-form-group>
                    </b-col>
                </b-form-row>
            </template>

            <template v-slot:newForm>
                <b-form-row class="justify-content-center">
                    <b-col cols="8">
                    <b-form-group class="text-black" label="Date" style="text-align: left;">
                        <v-date-picker v-model="dateRange" mode="range" :columns="2" :input-props='{
                        placeholder: "Please enter a range",
                        readonly: true
                        }'/>
                    </b-form-group>
                    </b-col>
                </b-form-row>
            </template>

        </flexible-form>

        <b-row id="showSuccessMsg" class="justify-content-center">
            <b-col cols="7">
                <b-alert variant="success" show>You have successfully updated a person</b-alert>
            </b-col>
        </b-row>

        <b-row id="showErrorMsg" class="justify-content-center">
            <b-col cols="7">
                <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
            </b-col>
        </b-row>

    </b-container>
    
</template>

<script>

import FlexibleForm from '@/components/forms/FlexibleForm'
import FormSelect from '@/components/forms/FormSelect'

import PlayerService from '@/services/player/PlayerService'
import TeamService from '@/services/team/TeamService'

import animateService from '@/services/AnimateService'

var dateFormat = require('dateformat');

export default {

    components: {
        FlexibleForm,
        FormSelect
    },

    data() {
        return {

            image: require(`@/assets/action-adult-athlete-1311619.jpg`),
            textColor: 'text-black',
            playerOptions: [],
            teamOptions: [],
            playerPreselect: null,
            teamPreselect: null,
            dateRange: {
                start: null,
                end: null
            },
            playername: null,
            personId: null,
            teamId: null,
            playerObject: [],
            playerId: null,

            inputs: [
                {
                title: "Normal Position",
                placeholder: "Enter a position",
                type: "text",
                required: true,
                value: '',
                disabled: false,
                icon: "fas fa-layer-group"
                },
                {
                title: "Player Number",
                placeholder: "Enter a player number",
                type: "number",
                required: "required",
                disabled: false,
                icon: "fas fa-hashtag"
                }
            ],

        }
    },

    beforeMount: async function () {
       this.getPlayers();
       this.getTeams();
    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    methods: {
        async submitForm(value) {
            console.log(value);
            if(this.dateRange.start !== null && this.dateRange.end !== null) {
                var start = dateFormat(this.dateRange.start, "yyyy-mm-dd");
                var end = dateFormat(this.dateRange.end, "yyyy-mm-dd");
            

                this.playerObject = {
                    teamDateFrom : start,
                    teamDateTo : end,
                    playername : this.playername,
                    personId : this.personId,
                    teamId : this.teamId,
                    normalPosition : this.inputs[0].value,
                    playerNumber : this.inputs[1].value,
                    imageUrl : null
                }
            }

            let response = await PlayerService.update(this.playerObject, this.playerId);

            if(response.status === 201) {
                this.printMsg('showSuccessMsg');
                this.resetForm();
            } else {
                this.printMsg('showErrorMsg');
            }

        },

        resetForm() {
            this.teamPreselect = null;
            this.playerPreselect = null;
            this.inputs[0].value = '',
            this.inputs[1].value = '',
            this.dateRange = {
                start: null,
                end: null
            }
        },

        onSelectedPlayer(value) {
            console.log(value);
            this.playerPreselect = value;
            this.playername = value.playername;
            this.personId = value.person.personId;
            this.playerId = value.playerId;
            this.teamPreselect = value.team;
            this.teamId = value.team.teamId;

            this.inputs[0].value = value.normalPosition;
            this.inputs[1].value = value.playerNumber;

            this.dateRange = {
                start: new Date(value.teamDateFrom),
                end: new Date(value.teamDateTo)
            }
        },

        onSelectedTeam(value) {
            this.teamId = value.teamId;
        },

        async getPlayers() {

            let players = await PlayerService.findAll();
            let option = [];
            
            for(var i = 0; i < players._embedded.playerModelList.length; i++) {
                if(i === 0) {
                    option[i] = {
                        value: null,
                        text: 'Please select a player',
                        disabled: true
                    }
                }

                option[i+1] = {
                value: players._embedded.playerModelList[i],
                text: players._embedded.playerModelList[i].playername
                }
            }
            this.playerOptions = option;

        },

        async getTeams() {
            let teams = await TeamService.findAll();
            let teamOption = [];

            

            for(var i = 0; i < teams._embedded.teamModelList.length; i++) {
                if(i === 0) {
                    teamOption[i] = {
                        value: null,
                        text: 'Please select a team',
                        disabled: true
                    }
                }
                delete teams._embedded.teamModelList[i]._links;

                teamOption[i+1] = {
                value: teams._embedded.teamModelList[i],
                text: teams._embedded.teamModelList[i].association.name
                }
            }
            this.teamOptions = teamOption;
        },
        
        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', 'delay-1s', () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        document.getElementById(element).setAttribute("hidden", "");
                    });
                });
        }
    }
    
}
</script>

<style>

</style>