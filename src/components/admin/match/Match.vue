<template>
    <b-container>
        <h1>Match</h1>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form :image="image">

                    <template v-slot:firstDropdown>
                        <b-form-row class="justify-content-center">
                            <b-col cols="8">
                            <b-form-group class="text-white" label="Pick a match" style="text-align: left;">
                                <b-input-group>
                                <form-select :options="matchOptions" :preselect="matchPreselect" v-on:DropDownValue="onSelectMatch"/>
                                    <b-input-group-append>
                                        <b-btn variant="primary" v-on:click="newMatch">New Match</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                            </b-col>
                        </b-form-row>
                    </template>

                    <template v-slot:newForm v-if="true">
                        <b-form-row class="justify-content-center">
                            <b-col cols="8">

                            <b-form-group class="text-white" label="Pick home team" style="text-align: left;">
                                <b-input-group>
                                <form-select :options="homeTeamOptions" :preselect="homeTeamPreselect" v-on:DropDownValue="onSelectHomeTeam"/>
                                </b-input-group>
                            </b-form-group>

                            <b-form-group class="text-white" label="Pick away team" style="text-align: left;">
                                <b-input-group>
                                <form-select :options="awayTeamOptions" :preselect="awayTeamPreselect" v-on:DropDownValue="onSelectAwayTeam"/>
                                </b-input-group>
                            </b-form-group>

                            <b-form-group class="text-white" label="Pick a location" style="text-align: left;">
                                <b-input-group>
                                <form-select :options="locationOptions" :preselect="locationPreselect" v-on:DropDownValue="onSelectLocation"/>
                                </b-input-group>
                            </b-form-group>

                            <b-form-group class="text-white" label="Pick a season" style="text-align: left;">
                                <b-input-group>
                                <form-select :options="seasonOptions" :preselect="seasonPreselect" v-on:DropDownValue="onSelectSeason"/>
                                </b-input-group>
                            </b-form-group>

                            
                            <b-form-group class="text-white" label="Pick a date" style="text-align: left;">
                                <b-input-group>
                                <v-date-picker v-model="date" columns="2" :input-props='{
                                    placeholder: "Please pick a date",
                                    readonly: true
                                    }'/>
                                </b-input-group>
                            </b-form-group>



                            </b-col>
                        </b-form-row>
                    </template>

                </flexible-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import MatchService from "@/services/match/MatchService";
import TeamService from "@/services/team/TeamService"
import LocationService from "@/services/location/LocationService"
import SeasonService from "@/services/season/SeasonService"

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect"
import FlexibleInputs from "@/components/forms/inputs/FlexibleInputs"


export default {

    components: {
        FlexibleForm,
        FormSelect,
        FlexibleInputs
    },

    beforeMount: async function () {
        let matches = await MatchService.findAll();
        
        let matchOption = [];

        for(var i = 0; i < matches._embedded.matchModelList.length; i++) {

            delete matches._embedded.matchModelList[i]._links;

            if(i === 0) {
                matchOption[i] = {
                    value: null,
                    text: 'Please pick a match'
                }
            }

            matchOption[i+1] = {
                value: matches._embedded.matchModelList[i],
                text: matches._embedded.matchModelList[i].homeTeam.association.name + " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name
            }
        }

        this.matchOptions = matchOption;
    },

    methods: {
        onSelectMatch(value) {
            console.log(value);
            this.homeTeamPreselect = value.homeTeam;
            this.awayTeamPreselect = value.awayTeam;
            this.locationPreselect = value.location;
            this.seasonPreselect = value.season;
            this.generateOptions(value);
            this.onShowDropdowns = true;
        },

        onSelectHomeTeam(value) {
            console.log(value);
        },

        onSelectAwayTeam(value) {
            console.log(value);
        },

        onSelectLocation(value) {
            console.log(value);
        },

        onSelectSeason(value) {
            console.log(value);
        },

        newMatch() {
            //Add inputs
        },

        async generateOptions(matchObject) {
            this.getTeams();
            this.getLocations();
            this.getSeasons();
        },

        async getTeams() {
            let teams = await TeamService.findAll();
            let teamOption = [];

            for(var i = 0; i < teams._embedded.teamModelList.length; i++) {

                delete teams._embedded.teamModelList[i]._links;

                if(i === 0) {
                    teamOption[i] = {
                        value: null,
                        text: 'Please pick a team',
                        disabled: true
                    }
                }

                teamOption[i+1] = {
                    value: teams._embedded.teamModelList[i],
                    text: teams._embedded.teamModelList[i].association.name
                }
            }

            this.homeTeamOptions = teamOption;
            this.awayTeamOptions = teamOption;       
        },

        async getLocations() {
            let locations = await LocationService.findAll();
            let locationOption = [];

            for(var i = 0; i < locations._embedded.locationModelList.length; i++) {

                delete locations._embedded.locationModelList[i]._links;

                if(i === 0) {
                    locationOption[i] = {
                        value: null,
                        text: 'Please pick a location',
                        disabled: true
                    }
                }

                locationOption[i+1] = {
                    value: locations._embedded.locationModelList[i],
                    text: locations._embedded.locationModelList[i].name
                }
            }

            this.locationOptions = locationOption;
        },

        async getSeasons() {
            let seasons = await SeasonService.findAll();
            let seasonOption = [];
            
            for(var i = 0; i < seasons._embedded.seasonModelList.length; i++) {

                delete seasons._embedded.seasonModelList[i]._links;

                if(i === 0) {
                    seasonOption[i] = {
                        value: null,
                        text: 'Please pick a season',
                        disabled: true
                    }
                }

                seasonOption[i+1] = {
                    value: seasons._embedded.seasonModelList[i],
                    text: seasons._embedded.seasonModelList[i].name
                }
            }

            this.seasonOptions = seasonOption;

        }
    },


    data() {
        return {
            image: require(`@/assets/athletes-competition-fans-9003.jpg`),
            matchOptions: [],
            homeTeamOptions: [],
            awayTeamOptions: [],
            locationOptions: [],
            seasonOptions: [],

            matchPreselect: null,
            homeTeamPreselect: null,
            awayTeamPreselect: null,
            locationPreselect: null,
            seasonPreselect: null,
            date: null,

            onShowDropdowns: false,
            matchInputs: [],

        }
    }
    
}
</script>

<style>

</style>