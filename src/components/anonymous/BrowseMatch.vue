<template>
  <div>
    <h1 style="color:black;">One match</h1>
    <hr class="pretty" />

    <center>
      <h3>Please select a match</h3>
      <b-row class="justify-content-center">
        <b-col cols="8">
          <form-select :options="matchOptions" v-on:DropDownValue="onSelectMatch" />
          <p>{{resultat}}</p>
        </b-col>
      </b-row>
      <hr class="pretty" />

      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="8">
            <div v-for="match in match">
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
import MatchService from '@/services/match/MatchService';
import FormSelect from '@/components/forms/FormSelect';

export default {
  
  async beforeMount() {
    this.getMatches();
  },
  
  methods: {

    async getMatches() {
      let matches = await MatchService.findAll();
      let options = [];

      for(var i = 0; i < matches._embedded.matchModelList.length; i++) {
        delete matches._embedded.matchModelList[i]._links;

        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please select a match',
            disabled: true
          }
        }

        options[i+1] = {
          value: matches._embedded.matchModelList[i].matchId,
          text: matches._embedded.matchModelList[i].homeTeam.association.name +
          " - " + matches._embedded.matchModelList[i].awayTeam.association.name +
          " # " + matches._embedded.matchModelList[i].matchDate,
          disabled: false
        }
      }

      this.matchOptions = options;

    },

    async onSelectMatch(value) {
      this.resultat = "";
            this.match = await MatchService.findById(value);
            console.log(this.match.matchModel.homeTeam.association.name)
            console.log(this.match.matchModel.awayTeam.association.name)
            console.log(this.match.result)
            if (this.match.result == "Draw") {
              this.resultat = "Resulted in a " + this.match.result;
            }
            else  if (this.match.result != "Draw") {this.resultat = "A win for "+ this.match.result;}
    },
  },

  data() {
    return {
        resultat: "", 
        match: "",
        searchString: "",
        filteredList: this.matches,
        matchString: '',
        matchOptions: []
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