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
// @ is an alias to /src
export default {
  name: "home",
  components: { HomePageCards }
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
