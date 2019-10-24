<template>
  <div class="home">
    <MatchEvent/>
  </div>
  
</template>

<script>
import HomePageCards from "@/components/cards/HomePageCards";
import FlexibleForm from '@/components/forms/FlexibleForm';
import MatchEvent from '@/components/user/match/MatchEvent';
// @ is an alias to /src
export default {
  methods : {
    submitForm (value) {
      console.log("____________")
      console.log(value) // someValue
    
    }
  },
  data : function() {return {
    inputs : [
      {title : "name", placeholder : "Search for a player", type:"email"},
      {title : "age", placeholder : "age of player ", type:"email"},
      {title : "team", placeholder : "What team is the player on", type:"number"},
    ]
  }},
  name: "home",
  components: { HomePageCards, FlexibleForm, MatchEvent }
};
</script>

<style>
.home {
  margin-top: 60px;
}

.landing-image {
  max-width: 50%;
}

h2 {
  color: grey;
}
hr.pretty {
  max-width: 40%;

  border-top: 2px solid orange;
}
</style>
