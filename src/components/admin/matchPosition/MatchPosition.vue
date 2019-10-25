<template>
  <b-container>
      <h1 class="text-black">Match Position</h1>
      <br>
      <b-row>
          <b-col cols="4">
              <b-card>

                <b-form-group class="text-black" label="Pick a match" style="text-align: left;">
                    <b-input-group>
                        <form-select :options="matchOptions" :preselect="matchPreselect" v-on:DropDownValue="onSelectMatch"/>
                    </b-input-group>
                </b-form-group>

                <b-form-group class="text-black" label="Pick a team" style="text-align: left;" v-if="matchSelected">
                    <b-input-group>
                        <form-select :options="teamOptions" :preselect="teamPreselect" v-on:DropDownValue="onSelectTeam"/>
                    </b-input-group>
                </b-form-group>

                <b-row class="justify-content-center" v-if="allPositionsSet" align-h="around">
                    <b-col cols="6">
                        <b-btn variant="success" v-on:click="setPositions">Set positions</b-btn>
                    </b-col>
                    <b-col cols="6">
                        <b-btn variant="danger" v-on:click="resetPositions">Reset</b-btn>
                    </b-col>
                </b-row>

              </b-card>
              <br>
              <b-row id="showSuccessMsg" class="justify-content-center">
                    <b-col cols="12">
                        <b-alert variant="success" show>You have successfully created a formation.</b-alert>
                    </b-col>
                </b-row>

                <b-row id="showErrorMsg" class="justify-content-center">
                    <b-col cols="12">
                        <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                    </b-col>
                </b-row>
          </b-col>
          <b-col cols="8">
            <img src="@/assets/bird-s-eye-view-circle-drone-photography-2291006.jpg" alt="Snow" style="width:80%; height: 650px;" />
            <div class="centered">
                <br><br><br><br><br>
                <!-- Strikers -->
                <b-row align-h="around">
                    <b-col cols="4">
                        <form-select :options="playerOptions" :preselect="leftStriker" v-on:DropDownValue="onSelectLeftStriker"/>
                    </b-col>

                    <b-col cols="4">
                        <form-select :options="playerOptions" :preselect="rightStriker" v-on:DropDownValue="onSelectRightStriker"/>
                    </b-col>
                </b-row>
                <br>
                <!-- Midfilders -->
                <br><br><br><br>
                <b-row>
                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="leftMid" v-on:DropDownValue="onSelectLeftMid"/>
                    </b-col>

                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="leftCenterMid" v-on:DropDownValue="onSelectLeftCenterMid"/>
                    </b-col>

                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="rightCenterMid" v-on:DropDownValue="onSelectRightCenterMid"/>
                    </b-col>

                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="rightMid" v-on:DropDownValue="onSelectRightMid"/>
                    </b-col>
                </b-row>
                <br>
                <!-- Defense -->
                <br><br><br><br>
                <b-row>
                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="leftDefense" v-on:DropDownValue="onSelectLeftDefense"/>
                    </b-col>

                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="leftCenterDefense" v-on:DropDownValue="onSelectLeftCenterDefense"/>
                    </b-col>
                    
                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="rightCenterDefense" v-on:DropDownValue="onSelectRightCenterDefense"/>
                    </b-col>

                    <b-col cols="3">
                        <form-select :options="playerOptions" :preselect="rightDefense" v-on:DropDownValue="onSelectRightDefense"/>
                    </b-col>
                </b-row>
                <br><br><br>
                <!-- Keeper -->
                <b-row align-h="center">
                    <b-col cols="4">
                        <form-select :options="playerOptions" :preselect="keeper" v-on:DropDownValue="onSelectKeeper"/>
                    </b-col>
                </b-row>
            </div>
          </b-col>
      </b-row>
  </b-container>
</template>

<script>
import FormSelect from "@/components/forms/FormSelect";


import teamService from "@/services/team/TeamService.js";
import playerService from '@/services/player/PlayerService.js';
import MatchService from "@/services/match/MatchService"
import MatchPositionService from "@/services/matchPosition/MatchPositionService"
import animateService from '@/services/AnimateService'

export default {
  async beforeMount() {
    this.getMatches();
    
  },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

  methods: {
    resetPositions() {
        this.allPositionsSet = false;

        this.leftStriker = null;
        this.rightStriker = null;
        this.leftMid = null;
        this.leftCenterMid = null;
        this.rightCenterMid = null;
        this.rightMid = null;
        this.leftDefense = null;
        this.leftCenterDefense = null;
        this.rightCenterDefense = null;
        this.rightDefense = null;
        this.keeper = null;
    },

    async setPositions() {

        const array = this.makePlayerArray();

        for(var i = 0; i < array.length; i++) {
            let matchPositionObject = {
                matchId: this.matchPreselect.matchId,
                playerId: array[i].playerId,
                position: array[i].position
            }

            let response = await MatchPositionService.create(matchPositionObject);
            if(response.status === 201) {
                this.printMsg('showSuccessMsg');
            } else {
                this.printMsg('showErrorMsg');
            }
        }

  

    },

    makePlayerArray() {
        let array = [
            { playerId: this.leftStriker.playerId, position: 'Left striker' },
            { playerId: this.rightStriker.playerId, position: 'Right striker' },
            { playerId: this.leftMid.playerId, position: 'Left midfilder' },
            { playerId: this.leftCenterMid.playerId, position: 'Left center midfilder' },
            { playerId: this.rightCenterMid.playerId, position: 'Right center midfilder' },
            { playerId: this.rightMid.playerId, position: 'Right midfilder' },
            { playerId: this.leftDefense.playerId, position: 'Left defense' },
            { playerId: this.leftCenterDefense.playerId, position: 'Left center defense' },
            { playerId: this.rightCenterDefense.playerId, position: 'Right center defense' },
            { playerId: this.rightDefense.playerId, position: 'Right defense' },
            { playerId: this.keeper.playerId, position: 'Keeper'}
        ]

        return array;
    },

    onSelectMatch(value) {
        this.matchSelected = true;
        this.matchPreselect = value;
        this.getTeams(value.homeTeam, value.awayTeam);
    },

    async onSelectTeam(value) {
        this.teamPreselect = value;
        let positions =  await this.getMatchPositions();
        this.getPlayers(value.teamId, positions)
    },

    onSelectLeftStriker(value) {
        this.checkIfSelected(value);
        this.leftStriker = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectRightStriker(value) {
        this.checkIfSelected(value);
        this.rightStriker = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectLeftMid(value) {
        
        this.checkIfSelected(value);
        this.leftMid = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectLeftCenterMid(value) {
        
        this.checkIfSelected(value);
        this.leftCenterMid = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectRightCenterMid(value) {
        this.checkIfSelected(value);
        this.rightCenterMid = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectRightMid(value) {
        this.checkIfSelected(value);
        this.rightMid = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectLeftDefense(value) {
        this.checkIfSelected(value);
        this.leftDefense = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectLeftCenterDefense(value) {
        this.checkIfSelected(value);
        this.leftCenterDefense = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectRightCenterDefense(value) {
        this.checkIfSelected(value);
        this.rightCenterDefense = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectRightDefense(value) {
        this.checkIfSelected(value);
        this.rightDefense = value;
        this.allPositionsSet = this.checkAllSet();
    },
    onSelectKeeper(value) {
        this.checkIfSelected(value);
        this.keeper = value;
        this.allPositionsSet = this.checkAllSet();
    },

    checkIfSelected(player) {

        switch(player) {
            case this.leftStriker:
                this.leftStriker = null;
                break;
            case this.rightStriker:
                this.rightStriker = null;
                break;
            case this.leftMid:
                this.leftMid = null;
                break;
            case this.leftCenterMid:
                this.leftCenterMid = null;
                break;
            case this.rightCenterMid:
                this.rightCenterMid = null;
                break;
            case this.rightMid:
                this.rightMid = null;
                break;
            case this.leftDefense:
                this.leftDefense = null;
                break;
            case this.leftCenterDefense:
                this.leftCenterDefense = null;
                break;
            case this.rightCenterDefense: 
                this.rightCenterDefense = null;
                break;
            case this.rightDefense:
                this.rightDefense = null;
                break;
            case this.keeper:
                this.keeper = null;
                break;
        }
    },

    checkAllSet() {
        if(this.leftStriker !== null &&
           this.rightStriker !== null &&
           this.leftMid !== null &&
           this.leftCenterMid !== null &&
           this.rightCenterMid !== null &&
           this.rightMid !== null &&
           this.leftDefense !== null &&
           this.leftCenterDefense !== null &&
           this.rightCenterDefense !== null &&
           this.rightDefense !== null &&
           this.keeper !== null)
           {
               return true;
           } else {
               return false;
           }

    },

    async getPlayers(team, pos) {

        let players = await playerService.findAll();
        let options = [];

        for(var i = 0; i < players._embedded.playerModelList.length; i++) {
            delete players._embedded.playerModelList[i]._links;

            if(i === 0) {
                options[i] = {
                    value: null,
                    text: 'Please pick a player',
                    disabled: true
                }
            }

            if(players._embedded.playerModelList[i].team.teamId === team) {
               for(var j = 0; j < pos.length; j++) {
                    if(players._embedded.playerModelList[i].playerId === pos[j].playerId) {
                    
                        switch(pos[j].position) {
                            case 'Left striker':
                                this.leftStriker = players._embedded.playerModelList[i];
                                break;
                            case 'Right striker':
                                this.rightStriker = players._embedded.playerModelList[i];
                                break;
                            case 'Left midfilder':
                                this.leftMid = players._embedded.playerModelList[i];
                                break;
                            case 'Left center midfilder':
                                this.leftCenterMid = players._embedded.playerModelList[i];
                                break;
                            case 'Right center midfilder':
                                this.rightCenterMid = players._embedded.playerModelList[i];
                                break;
                            case 'Right midfilder':
                                this.rightMid = players._embedded.playerModelList[i];
                                break;
                            case 'Left defense':
                                this.leftDefense = players._embedded.playerModelList[i];
                                break;
                            case 'Left center defense':
                                this.leftCenterDefense = players._embedded.playerModelList[i];
                                break;
                            case 'Right center defense':
                                this.rightCenterDefense = players._embedded.playerModelList[i];
                                break;
                            case 'Right defense':
                                this.rightDefense = players._embedded.playerModelList[i];
                                break;
                            case 'Keeper':
                                break;
                        }
                    }
                }

                options[i+1] = {
                    value: players._embedded.playerModelList[i],
                    text: players._embedded.playerModelList[i].playername,
                    disabled: false
                }
            }
        }
        this.playerOptions = options;
    },
    
    async getTeams(homeTeam, awayTeam) {

        let options = [
            {
                value: null,
                text: 'Please pick a team',
                disabled: true
            },
            {
                value: homeTeam,
                text: homeTeam.association.name,
                disabled: false
            },
            {
                value: awayTeam,
                text: awayTeam.association.name,
                disabled: false
            }
        ]
        

        this.teamOptions = options;

    },

    async getMatches() {
        let matches = await MatchService.findAll();
        let options = [];

        for(var i = 0; i < matches._embedded.matchModelList.length; i++) {
            delete matches._embedded.matchModelList[i]._links;

            if(i === 0) {
                options[i] = {
                    value: null,
                    text: 'Please pick a match',
                    disabled: true
                }
            }

            options[i+1] = {
                value: matches._embedded.matchModelList[i],
                text: matches._embedded.matchModelList[i].homeTeam.association.name + 
                " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name +
                " # " + matches._embedded.matchModelList[i].matchDate,
                disabled: false
            }
        }
        this.matchOptions = options;
    },

    async getMatchPositions() {
        let positions = await MatchPositionService.findAll();
        let pos = [];
        if(positions.status !== 404) {
            for(var i = 0; i < positions._embedded.matchPositionModelList.length; i++) {
                pos[i] = {
                    playerId: positions._embedded.matchPositionModelList[i].id.playerId,
                    position: positions._embedded.matchPositionModelList[i].position
                }
            }
        }
        return pos;
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
      teamOptions: [],
      matchOptions: [],
      playerOptions:[],

      allPositionsSet: false,
      matchSelected: false,

      matchPreselect: null,
      teamPreselect: null,
      
      leftStriker: null,
      rightStriker: null,

      leftMid: null,
      leftCenterMid: null,
      rightCenterMid: null,
      rightMid: null,

      leftDefense: null,
      leftCenterDefense: null,
      rightCenterDefense: null,
      rightDefense: null,

      keeper: null,
    };
  },
  components: { FormSelect }
};
</script>

<style scoped>
 
.centered {
  position: absolute;
  width: 75%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>