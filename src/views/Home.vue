<template>
  <div class="home">
    <div>
      <h1>Welcome to the football-arena</h1>
      <hr class="pretty" />
    </div>


    <home-page-cards />

  </div>
  
</template>

<script>
import HomePageCards from "@/components/cards/HomePageCards";
import FlexibleForm from "@/components/forms/FlexibleForm";
// @ is an alias to /src
export default {
  methods: {
    submitForm(value) {
      console.log("____________");
      console.log(value); // someValue
    }
  },
  data: function() {
    return {
      inputs: [
        { title: "name", placeholder: "Search for a player", type: "email" },
        { title: "age", placeholder: "age of player ", type: "email" },
        {
          title: "team",
          placeholder: "What team is the player on",
          type: "number"
        }
      ]
    };
  },
  name: "home",
  components: { HomePageCards, FlexibleForm }
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

.footer {
  padding-top:70px;
   position:absolute;
   bottom:0;
   width:100%;
   height:60px;   /* Height of the footer */
}



</style>
