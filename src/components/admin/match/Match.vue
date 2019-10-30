<template>
    <b-container>
        <h1>Match</h1>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form :image="image" :showBtns="onShowBtns" @clicked="submitForm" @reset="resetForm">

                    <template v-slot:firstDropdown v-if="!onShowNewMatch">
                        <b-form-row class="justify-content-center">
                            <b-col cols="8">
                            <b-form-group class="text-white" label="Pick a match" style="text-align: left;">
                                <b-input-group>
                                <b-input-group-prepend>
                                    <span class="input-group-text"><i class="fas fa-fire-alt"></i></span>
                                </b-input-group-prepend>
                                <form-select :options="matchOptions" :preselect="matchPreselect" v-on:DropDownValue="onSelectMatch"/>
                                    <b-input-group-append>
                                        <b-btn variant="primary" v-on:click="newMatch">Create new</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                            </b-col>
                        </b-form-row>
                    </template>

                    <template v-slot:teamDropdown v-if="onShowNewMatch">

                        <b-form-row class="justify-content-center">
                            <b-col cols="8">

                                <b-form-group class="text-white" label="Pick home team" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-users"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="homeTeamOptions" :preselect="homeTeamPreselectUpdate" v-on:DropDownValue="onSelectHomeTeamUpdate"/>
                                    </b-input-group>
                                </b-form-group>

                                 <b-form-group class="text-white" label="Pick away team" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-users"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="awayTeamOptions" :preselect="awayTeamPreselectUpdate" v-on:DropDownValue="onSelectAwayTeamUpdate"/>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="text-white" label="Pick a location" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-map-marked-alt"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="locationOptions" :preselect="locationPreselectUpdate" v-on:DropDownValue="onSelectLocationUpdate"/>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="text-white" label="Pick a season" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="seasonOptions" :preselect="seasonPreselectUpdate" v-on:DropDownValue="onSelectSeasonUpdate"/>
                                    </b-input-group>
                                </b-form-group>

                                
                                <b-form-group class="text-white" label="Pick a date" style="text-align: left;">
                                    <v-date-picker v-model="dateUpdate" mode="multiple" :disabled-dates="disabledDate" :input-props='{
                                        placeholder: "Please pick a date",
                                        readonly: true
                                        }'/>
                                </b-form-group>

                            </b-col>
                        </b-form-row>

                    </template>

                    <template v-slot:newForm v-if="onShowDropdowns">
                        <b-form-row class="justify-content-center">
                            <b-col cols="8">
                                <b-form-group class="text-white" label="Pick home team" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-users"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="homeTeamOptions" :preselect="homeTeamPreselect" v-on:DropDownValue="onSelectHomeTeam"/>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="text-white" label="Pick away team" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-users"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="awayTeamOptions" :preselect="awayTeamPreselect" v-on:DropDownValue="onSelectAwayTeam"/>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="text-white" label="Pick a location" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-map-marked-alt"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="locationOptions" :preselect="locationPreselect" v-on:DropDownValue="onSelectLocation"/>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="text-white" label="Pick a season" style="text-align: left;">
                                    <b-input-group>
                                    <b-input-group-prepend>
                                        <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                                    </b-input-group-prepend>
                                    <form-select :options="seasonOptions" :preselect="seasonPreselect" v-on:DropDownValue="onSelectSeason"/>
                                    </b-input-group>
                                </b-form-group>

                                
                                <b-form-group class="text-white" label="Pick a date" style="text-align: left;">
                                    <v-date-picker v-model="date" :input-props='{
                                        placeholder: "Please pick a date",
                                        readonly: true
                                        }'/>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </template>
                </flexible-form>

                <b-row id="showSuccessMsg" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="success" show>You have successfully created a match</b-alert>
                    </b-col>
                </b-row>

                <b-row id="showSuccessMsgUpdate" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="success" show>You have successfully updated a match</b-alert>
                    </b-col>
                </b-row>

                <b-row id="showErrorMsg" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                    </b-col>
                </b-row>

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
import animateService from '@/services/AnimateService'

var dateFormat = require('dateformat');


export default {

    components: {
        FlexibleForm,
        FormSelect,
        FlexibleInputs
    },

    beforeMount: function () {
        this.getMatches();
    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showSuccessMsgUpdate').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    methods: {

        async submitForm(value) {

            if(this.onShowNewMatch) {

                let matchObject = {
                    matchDate: dateFormat(this.dateUpdate, "yyyy-mm-dd"),
                    homeTeamId: this.homeTeamPreselectUpdate.teamId,
                    awayTeamId: this.awayTeamPreselectUpdate.teamId,
                    locationId: this.locationPreselectUpdate.locationId,
                    seasonId: this.seasonPreselectUpdate.seasonId
                }

                let response = await MatchService.create(matchObject);

                if(response.status === 201) {
                    this.resetForm();
                    this.printMsg('showSuccessMsg');
                } else {
                    this.printMsg('showErrorMsg');
                }

            } else {

                let matchObject = {
                    matchDate: dateFormat(this.date, "yyyy-mm-dd"),
                    homeTeamId: this.homeTeamPreselect.teamId,
                    awayTeamId: this.awayTeamPreselect.teamId,
                    locationId: this.locationPreselect.locationId,
                    seasonId: this.seasonPreselect.seasonId
                }

                let response = await MatchService.update(matchObject, this.matchId);

                if(response.status === 201) {
                    this.resetForm();
                    this.printMsg('showSuccessMsgUpdate');
                } else {
                    this.printMsg('showErrorMsg');
                }
            }
        },

        resetForm() {

            if(this.onShowNewMatch) {
                this.onShowNewMatch = false;
                this.homeTeamPreselectUpdate = null;
                this.awayTeamPreselectUpdate = null;
                this.locationPreselectUpdate = null;
                this.seasonPreselectUpdate = null;
                this.dateUpdate = null;
                this.generateOptions();
                this.onShowBtns = false;

            } else {
                this.onShowDropdowns = false;
                this.onShowBtns = false;
                this.matchPreselect = null;
                this.getMatches();
            }
        },

        onSelectHomeTeamUpdate(value) {

            for(var i = 0; i < this.awayTeamOptions.length; i++) {
                if(this.awayTeamOptions[i].value === value) {
                    this.awayTeamOptions[i].disabled = true;
                }
            }
            this.homeTeamPreselectUpdate = value;
            this.checkMatchDate();
        },

        onSelectAwayTeamUpdate(value) {

            for(var i = 0; i < this.homeTeamOptions.length; i++) {
                if(this.homeTeamOptions[i].value === value) {
                    this.homeTeamOptions[i].disabled = true;
                }
            }
            this.awayTeamPreselectUpdate = value;
            this.checkMatchDate();
        },

        onSelectLocationUpdate(value) {

            this.locationPreselectUpdate = value;
        },

        onSelectSeasonUpdate(value) {

            this.seasonPreselectUpdate = value;
        },

        onSelectMatch(value) {
            
            this.matchPreselect = value;
            this.homeTeamPreselect = value.homeTeam;
            this.awayTeamPreselect = value.awayTeam;
            this.locationPreselect = value.location;
            this.seasonPreselect = value.season;
            this.generateOptions(value);
            this.onShowDropdowns = true;
            this.date = new Date(value.matchDate);
            this.matchId = value.matchId;
            this.onShowBtns = true;
        },

        onSelectHomeTeam(value) {
            this.homeTeamPreselect = value;
        },

        onSelectAwayTeam(value) {
            this.awayTeamPreselect = value;
        },

        onSelectLocation(value) {
            this.locationPreselect = value;
        },

        onSelectSeason(value) {
            this.seasonPreselect = value;
        },

        async checkMatchDate() {

            if(this.homeTeamPreselectUpdate !== null && this.awayTeamPreselectUpdate !== null) {
                let matches = await MatchService.findAll();
                
                for(var i = 0; i < matches._embedded.matchModelList.length; i++) {
                    if((matches._embedded.matchModelList[i].awayTeam.teamId === this.awayTeamPreselectUpdate.teamId 
                    && matches._embedded.matchModelList[i].homeTeam.teamId === this.homeTeamPreselectUpdate.teamId) 
                    || (matches._embedded.matchModelList[i].awayTeam.teamId === this.homeTeamPreselectUpdate.teamId 
                    && matches._embedded.matchModelList[i].homeTeam.teamId === this.awayTeamPreselectUpdate.teamId))
                    {
                        this.disabledDate.push(new Date(matches._embedded.matchModelList[i].matchDate));
                    }
                }
            }

        },

        newMatch() {
            this.onShowNewMatch = true;
            this.generateOptions();
            this.onShowBtns = true;
        },

        async generateOptions() {
            
            this.getTeams();
            this.getLocations();
            this.getSeasons();
        },

        async getMatches() {
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
                    text: matches._embedded.matchModelList[i].homeTeam.association.name + " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name + " - " + matches._embedded.matchModelList[i].matchDate
                }
            }
            this.matchOptions = matchOption;
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
                    text: teams._embedded.teamModelList[i].association.name,
                    disabled: false
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

        },

        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', null, () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        document.getElementById(element).setAttribute("hidden", "");
                    });
                });
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

            homeTeamPreselectUpdate: null,
            awayTeamPreselectUpdate: null,
            locationPreselectUpdate: null,
            seasonPreselectUpdate: null,

            date: null,
            dateUpdate: [],
            disabledDate: [],
            matchId: null,

            onShowDropdowns: false,
            onShowBtns: false,
            onShowNewMatch: false,
            matchInputs: [],

        }
    }
    
}
</script>

<style>

</style>