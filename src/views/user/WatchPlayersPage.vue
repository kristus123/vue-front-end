<template>
    <div>
        <h1 class="welcome-txt">Favourite players</h1>
        <br />
        <br />
        <div class="centered">{{ players }}</div>
        <player-card :players="players" class="centered"/>
    </div>
</template>

<script>
import PlayerCard from '@/components/cards/player/PlayerCard';
// import PlayerCard from '@/components/cards/player/PlayerCard'
import playerService from '@/services/player/PlayerService';

export default {
    name : "WatchPlayersPage",
    components : {
        PlayerCard
    },
    data() {
        return {
            players : [],
            infoPlayers : []
        }
    },
    
    created: async function () {
        try {
            let resp = await playerService.findAll();
                this.infoPlayers = resp;

            for(var i = 0; i < this.infoPlayers._embedded.playerModelList.length; i++) {
                const player = {
                    id: this.infoPlayers._embedded.playerModelList[i].playerId,
                    name: this.infoPlayers._embedded.playerModelList[i].person.firstName + ' ' + this.infoPlayers._embedded.playerModelList[i].person.lastName,
                    team: this.infoPlayers._embedded.playerModelList[i].team.association.name,
                    img: this.infoPlayers._embedded.playerModelList[i].imageUrl,
                    normalPosition: this.infoPlayers._embedded.playerModelList[i].normalPosition,
                    playerNumber: this.infoPlayers._embedded.playerModelList[i].playerNumber

                };
                this.players.push(player);
            }
        } catch (error) {
            console.error(error);
        }
    }

}
</script>

<style>
.welcome-txt {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>