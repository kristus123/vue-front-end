<template>
    <b-container>
        <h1>Match Goal</h1>
        
            <b-row class="justify-content-center">
                <b-col cols="10">
                    <b-card border-variant="secondary">
                        <b-btn variant="primary" v-on:click="newMatchGoal">Add match goal</b-btn>
                        <b-card-body>
                            
                            <b-row class="justify-content-center">
                                <b-table class="text-nowrap" sticky-header="sticky-header" striped hover selectable responsive :items="items" :fields="fields" select-mode="single" @row-selected="onRowSelected">
                                </b-table>
                            </b-row>
                        </b-card-body>

                        <flexible-form  :image="image" @clicked="submitForm" @reset="resetForm" v-if="showForm">

                            <template v-slot:firstDropdown>
                                <b-form-row class="justify-content-center">
                                    <b-col cols="8">
                                        <b-form-group class="text-white" label="Player" style="text-align: left;">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text"><i class="fas fa-running"></i></span>
                                                </b-input-group-prepend>
                                                <form-select :options="playerOptions" :preselect="playerPreselect"  v-on:DropDownValue="onSelectPlayer"/>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                            </template>

                            <template v-slot:personDropdown>
                                <b-form-row class="justify-content-center">
                                    <b-col cols="8">
                                        <b-form-group class="text-white" label="Match" style="text-align: left;">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text"><i class="fas fa-fire-alt"></i></span>
                                                </b-input-group-prepend>
                                                <form-select :options="matchOptions"  :preselect="matchPreselect"  v-on:DropDownValue="onSelectMatch"/>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                            </template>

                            <template v-slot:teamDropdown>
                                <b-form-row class="justify-content-center">
                                    <b-col cols="8">
                                        <b-form-group class="text-white" label="Goal type" style="text-align: left;">
                                            <b-input-group>
                                                <b-input-group-prepend>
                                                    <span class="input-group-text"><i class="fas fa-crosshairs"></i></span>
                                                </b-input-group-prepend>
                                                <form-select :options="goalTypeOptions"  :preselect="goalTypePreselect"  v-on:DropDownValue="onSelectGoalType"/>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                            </template>

                            <template v-slot:newForm>
                                <b-form-row class="justify-content-center">
                                    <b-col cols="8">
                                        <b-form-group class="text-white" label="Description" style="text-align: left;">
                                            <b-input-group>
                                               <b-form-textarea v-model="description" rows="3" ymax-rows="8"></b-form-textarea>
                                            </b-input-group>
                                        </b-form-group>
                                    </b-col>
                                </b-form-row>
                            </template>

                        </flexible-form>

                    </b-card>
                    <br>
                    <b-row id="showSuccessMsg" class="justify-content-center">
                        <b-col cols="10">
                            <b-alert variant="success" show>You have successfully created a match goal</b-alert>
                        </b-col>
                    </b-row>

                    <b-row id="showSuccessMsgUpdate" class="justify-content-center">
                        <b-col cols="10">
                            <b-alert variant="success" show>You have successfully updated a match goal</b-alert>
                        </b-col>
                    </b-row>

                    <b-row id="showErrorMsg" class="justify-content-center">
                        <b-col cols="10">
                            <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        
    </b-container>    
</template>

<script>

import FormSelect from "@/components/forms/FormSelect"
import FlexibleForm from "@/components/forms/FlexibleForm"

import PlayerService from "@/services/player/PlayerService"
import MatchService from "@/services/match/MatchService"
import MatchGoalService from "@/services/matchGoal/MatchGoalService"
import GoalTypeService from "@/services/goalType/GoalTypeService"
import animateService from '@/services/AnimateService'

export default {

    components: {
        FormSelect,
        FlexibleForm
    },

    beforeMount: function () {
        this.getPlayers();
        this.getMatches();
        this.getGoalTypes();
        this.getAllItems();

    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showSuccessMsgUpdate').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    methods: {
        async submitForm() {
            let matchGoalObject = {

                playerId: this.playerPreselect.playerId,
                matchId: this.matchPreselect.matchId,
                goalTypeId: this.goalTypePreselect.goalTypeId,
                description: this.description

            }

            if(this.onSelectNewForm) {
                let response = await MatchGoalService.create(matchGoalObject);

                if(response.status === 201) {
                    this.resetForm();
                    this.getAllItems();
                    this.printMsg('showSuccessMsg');
                } else {
                    this.printMsg('showErrorMsg');
                }
            } else {
                let response = await MatchGoalService.update(matchGoalObject, this.matchId);

                if(response.status === 201) {
                    this.resetForm();
                    this.getAllItems();
                    this.printMsg('showSuccessMsgUpdate');
                } else {
                    this.printMsg('showErrorMsg');
                }
            }
        },
        resetForm() {
            this.playerPreselect = null;
            this.matchPreselect = null;
            this.goalTypePreselect = null;
            this.description = '';
            this.showForm = false;
        },

        newMatchGoal() {
            this.onSelectNewForm = true;
            this.showForm = true;
        },

        async onRowSelected(item) {
            this.matchId = item[0].Id;
            this.onSelectNewForm = false;
            this.showForm = true;
            let matchGoal = await MatchGoalService.get(item[0].Id);
            this.playerPreselect = matchGoal.player;
            this.matchPreselect = matchGoal.match;
            this.goalTypePreselect = matchGoal.goalType;
            this.description = matchGoal.description;
        },

        onSelectPlayer(value) {
            this.playerPreselect = value;
        },
        onSelectMatch(value) {
            this.matchPreselect = value;
        },
        onSelectGoalType(value) {
            this.goalTypePreselect = value;
        },

        async getPlayers() {
            let players = await PlayerService.findAll();
            let options = [];

            for(var i = 0; i < players.length; i++) {
                delete players[i]._links

                if(i === 0) {
                    options[i] = {
                        value: null,
                        text: 'Pick a player',
                        disabled: true
                    }
                }

                options[i+1] = {
                    value: players[i],
                    text: players[i].playername,
                    disabled: false
                }
            }

            this.playerOptions = options;
        },
        async getMatches() {
            let matches = await MatchService.findAll();
            
            let matchOption = [];

            for(var i = 0; i < matches._embedded.matchModelList.length; i++) {

                delete matches._embedded.matchModelList[i]._links;

                if(i === 0) {
                    matchOption[i] = {
                        value: null,
                        text: 'Pick a match',
                        disabled: true
                    }
                }

                matchOption[i+1] = {
                    value: matches._embedded.matchModelList[i],
                    text: matches._embedded.matchModelList[i].homeTeam.association.name + " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name + " - " + matches._embedded.matchModelList[i].matchDate,
                    disabled: false
                }
            }
            this.matchOptions = matchOption; 
        },

        async getGoalTypes() {
            let goalTypes = await GoalTypeService.findAll();
            let option = [];

            for(var i = 0; i < goalTypes._embedded.goalTypeModelList.length; i++) {
                delete goalTypes._embedded.goalTypeModelList[i]._links;
                if(i === 0) {
                    option[i] = {
                        value: null,
                        text: 'Pick a goal type',
                        disabled: true
                    }
                }
                option[i+1] = {
                    value: goalTypes._embedded.goalTypeModelList[i],
                    text: goalTypes._embedded.goalTypeModelList[i].typeName,
                    disabled: false
                }

            }
           
            this.goalTypeOptions = option;
        },

        async getAllItems() {
            let items = await MatchGoalService.findAll();
            let options = [];
            
            for(var i = 0; i < items._embedded.matchGoalModelList.length; i++) {
                let type = this.splitType(items._embedded.matchGoalModelList[i].goalType.typeName, "_");
                options[i] = { 
                        Player: items._embedded.matchGoalModelList[i].player.playername,
                        Type: type,
                        Match: items._embedded.matchGoalModelList[i].match.homeTeam.association.name
                                 + " vs. " + items._embedded.matchGoalModelList[i].match.awayTeam.association.name
                                 + " # " + items._embedded.matchGoalModelList[i].match.matchDate,
                        Description: items._embedded.matchGoalModelList[i].description.substring(0, 25),
                        Id: items._embedded.matchGoalModelList[i].goalId
                    }
            }
            this.items = options;
        },

        splitType(str, sep) {
            let type = '';
            if(str.split(sep).length > 1) {
                let split = str.split(sep);
                for(var j = 0; j < split.length; j++) {
                    if(j === 0) {
                        type += split[j].substr(0, 1);
                        type += split[j].substr(1).toLowerCase();
                        type += " ";
                    } else {
                        type += split[j].toLowerCase();
                        if(j !== split.length - 1) {
                            type += " ";
                        }
                    }   
                }
            } else {
                type += str.substr(0,1);
                type += str.substr(1).toLowerCase();
            }
            return type;

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
            playerPreselect: null,
            matchPreselect: null,
            goalTypePreselect: null,
            matchId: null,
            onSelectNewForm: false,

            items: [],
            fields: [
                {
                    key: 'Player',
                    sortable: true
                },
                {
                    key: 'Type',
                    sortable: true
                },
                {
                    key: 'Match',
                    sortable: true
                },
                {
                    key: 'Description',
                    sortable: true
                },
            ],
            playerOptions: [],
            matchOptions: [],
            goalTypeOptions: [],
            goalTypeOptions: null,
            showForm: false,
            image: require(`@/assets/dawn-field-fog-149356.jpg`),
            description: ''
        }
    }
    
}
</script>

<style>

</style>