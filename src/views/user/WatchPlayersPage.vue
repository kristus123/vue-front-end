<template>
    <div>
        <br>
        <h1>Favourite players</h1>
        <br>

        <b-container>
            
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                <b-form-group class="text-black" style="text-align: left;">
                    <b-input-group>
                        <b-form-select :options="playerOptions" v-model="selectedPlayer" v-on:DropDownValue="onSelectedPlayer"/>
                        <b-input-group-append>
                            <b-btn variant="primary" v-on:click="addPlayer" :disabled="selectedPlayer == null">Add</b-btn>
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

        <b-container id="userPlayerContainer">
            <b-row>
                <b-col cols="4" v-for="player in players" :key="player.playerId">
                    <player-card :playerAttr="player"/>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from '@/components/forms/FormSelect'

import PlayerCard from '@/components/cards/player/PlayerCard';
import playerService from '@/services/player/PlayerService';
import userPlayerService from '@/services/user/UserPlayerService';


export default {
    name : "WatchPlayersPage",
    components : {
        FlexibleForm,
        FormSelect,
        PlayerCard
    },
    data() {
        return {
            textColor: "text-black",
            image: require(`@/assets/action-adult-athlete-1311619.jpg`),
            selectedPlayer: null,

            players : [], // players in my own watchlist
            infoPlayers : [],
            playerOptions: [] // players in the whole system

        }
    },
    
    created: async function () {
        try {
            // let resp = await userPlayerService.findAll(); // this is what we want
            let resp = await playerService.findAll(); // hack for demo purposes
                this.infoPlayers = resp;

            //console.log(this.infoPlayers);

            for(var i = 0; i < this.infoPlayers._embedded.playerModelList.length; i++) {
                const player = {
                    playerId: this.infoPlayers._embedded.playerModelList[i].playerId,
                    playername: this.infoPlayers._embedded.playerModelList[i].person.firstName + ' ' + this.infoPlayers._embedded.playerModelList[i].person.lastName,
                    team: this.infoPlayers._embedded.playerModelList[i].team,
                    imageUrl: this.infoPlayers._embedded.playerModelList[i].imageUrl,
                    normalPosition: this.infoPlayers._embedded.playerModelList[i].normalPosition,
                    playerNumber: this.infoPlayers._embedded.playerModelList[i].playerNumber

                };
                if (i % 6 == 0) this.players.push(player); // hack for demo purposes
            }
        } catch (error) {
            console.error(error);
        }
    },
    mounted: function() {
        // document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        // document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },
    beforeMount: async function() {

        this.onShowBtns = false;

        let allPlayers = await playerService.findAll();
        let playerOption = [];

        //Populating the player options for the dropdown
        if(allPlayers._embedded.playerModelList.length === 0) {
            playerOption[0] = {
            value: null,
            text: 'No players available!',
            disabled: true
            }
        } else {

            for(var i = 0; i < allPlayers._embedded.playerModelList.length; i++) {
                if(i === 0) {
                    playerOption[0] = {
                        value: null,
                        text: 'Please select a player',
                        disabled: true
                    }
                } else if (!this.players.some(item => item.playerId === allPlayers._embedded.playerModelList[i].playerId)) {

                    playerOption[i+1] = {
                        value: allPlayers._embedded.playerModelList[i],
                        text: allPlayers._embedded.playerModelList[i].person.firstName + " " + allPlayers._embedded.playerModelList[i].person.lastName
                    }
                }
            }
        }

        this.playerOptions = playerOption;
    },
    methods: {
      
        onSelectedPlayer(value) {
            this.selectedPlayer = value;
        },
        async addPlayer() {
            let playerObject = {
                playerId: this.selectedPlayer.playerId,
            }
            console.log(playerObject);
            let response = await userPlayerService.add(playerObject);
            // if(response.status === 201) {
            //     // this.$delete(this.players, this.players.indexOf(this.selectedPlayer)); // how to do??
            //     // this.printMsg('showSuccessMsg');
            // } else {
            //     // this.printMsg('showErrorMsg');
            // }
        }
    }

}
</script>

<style>
.welcome-txt-player {
    position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered-player {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>