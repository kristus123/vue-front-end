<template>
    <b-container>
        <h1>Add a player</h1>
        <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor" @clicked="submitForm"/>
    </b-container>
</template>

<script>

import FlexibleForm from '@/components/forms/FlexibleForm'

export default {
    name: 'Addplayer',
    components: {
        FlexibleForm
    },

  beforeMount: async function() {
    let people = await personService.getPerson();
    
    let players = await playerService.findAll();

    let playersID = [];
    let personID = [];

    let nonPlayers = [];

    for(var i = 0; i < people.length; i++) {
      for(var j = 0; j < players.length; j++) {



      }


    }


    /*for(var i = 0; i < players.length; i++) {
      playersID.push(players[i].person.personId);
    }

    for(var i = 0; i < people.length; i++) {
      personID.push(people[i].personId);
    }

    for(var i = 0; i < personID.length; i++) {
      if(playersID.includes(personID[i])){
        console.log("Person is allready assigned a player");
      } else {
          nonPlayers.push(personID[i]);
      }
    }
    


    for(var i = 0; i < people.length; i++) {
      for(var j = 0; j < nonPlayers.length; j++) {
        if(people[i].personId === nonPlayers[j]) {
          this.options.push(people[i]);
        }
      }
    }

    console.log(this.options);*/



  },


  methods: {
    submitForm(value) {
      playerService.create(value);
    }
  },

  data() {
    return {
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Normal Position",
          placeholder: "Enter a position",
          type: "text",
          required: true,
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
      options: [],

    };
  }
};
</script>

<style>

</style>