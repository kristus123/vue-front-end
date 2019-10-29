<template>
  <div>
    <h1 style="color:black;">One player</h1>
    <hr class="pretty" />

    <center>
      <h3>Player Data</h3>
      <b-row class="justify-content-center">
        <b-col cols="8">
          <form-select :options="playerOptions" v-on:DropDownValue="onSelectPlayer" />
          <p>{{playerData}}</p>
        </b-col>
      </b-row>
      <hr class="pretty" />

      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="8">
            <div v-for="player in player">
              <div style="max-width:100%; padding:20px;">
                
              </div>
            </div>
          </b-col>

          <b-col>
            <strong>
              <b-card style="margin-top:20px;">  
                
                

              </b-card>
            </strong>
          </b-col>
        </b-row>
      </b-container>
    </center>
  </div>
</template>

<script>
import PlayerService from '@/services/player/PlayerService';
import FormSelect from '@/components/forms/FormSelect';

export default {
  
  async beforeMount() {
    this.getPlayers();
  },
  
  methods: {

    async getPlayers() {
      let players = await PlayerService.findAll();
      let options = [];
      

      for(var i = 0; i < players._embedded.playerModelList.length; i++) {
        console.log(players._embedded.playerModelList[i]);
        delete players._embedded.playerModelList[i]._links;

        if(i === 0) {
          options[i] = {
            value: null,
            text: '',
            disabled: true
          }
        }

        options[i+1] = {
          value: players._embedded.playerModelList[i].playerId,
          text: players._embedded.playerModelList[i].playername + " " + players._embedded.playerModelList[i].team.association.name,
                    
          disabled: false
        }
      }

      this.playerOptions = options;

    },

    async onSelectPlayer(value) {
      this.playerData = "";
            this.player = await PlayerService.findById(value); // I somehow couldn't get this to work
            console.log(this.player);
            this.playerData = "Test";
            
    },
  },

  data() {
    return {
        playerData: "", 
        player: "",
        searchString: "",
        filteredList: this.players,
        playerString: '',
        playerOptions: []
    };
  },
  components:{
    FormSelect
  }
};
</script>

<style>
h1 {
  text-align: center;
}

h1 span {
  /* background-color: black;  */
  border-radius: 200px;
  background: rgb(0, 0, 0);
  padding: 10px;
  width: 10px;
  height: 10px;
}
</style>