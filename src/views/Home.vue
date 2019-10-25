<template>
  <b-container class="home">
    <div>
      <h1>Welcome to ProFotball!</h1>
      <hr class="pretty" />
    </div>

    <div class="parallax firstSection">
      <b-row> 
        <b-col></b-col>
        <b-col></b-col>
        <b-col cols="6" style="margin-top:150px">
          <h1 align="left" class="header-text-one">Football website <br>
            for monoitoring your favorite players and teams easily!
          </h1>
        </b-col>
      </b-row>

      <b-row> 
        <b-col></b-col>
        <b-col></b-col>
        <b-col cols="6" style="margin-top:10px">
          <h3 align="left" style="color:black;">
              Get over 10 unique features
          </h3>
        </b-col>
      </b-row>

      <b-row> 
        <b-col></b-col>
        <b-col></b-col>
        <b-col cols="6" style="margin-top:20px; margin-bottom:60px;">
          <b-button style="float:left;">See our features</b-button>
        </b-col>
      </b-row>
    </div>

    <div class="section-split">
      We have over 100 new features and 10 super unique. <br>
      More text and transitions
    </div>
    <div class="section-split-2">
      We have over 100 new features and 10 super unique. <br>
      More text and transitions
    </div>
    <div class="section-split-3">
      We have over 100 new features and 10 super unique. <br>
      More text and transitions
    </div>

    <div class="parallax secondSection">
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li> 
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li> 
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li> 
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li> 
      </ul>
    </div>

    <div class="section-split">
      Take a look at these awesome testimonials <br>
      More text and transitions
    </div>

    <div class="thirdSection">
      <h1>dkjasldjakljdaskldjklasdjkl <br> dkjasldjakljdaskldjklasdjkl <br>dkjasldjakljdaskldjklasdjkl <br>dkjasldjakljdaskldjklasdjkl <br></h1>
    </div>

  </b-container>
  
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

@import url('https://fonts.googleapis.com/css?family=Catamaran:700&display=swap');

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

.parallax {

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.firstSection {
  /* The image used */
  background-image: url('https://ugc.futurelearn.com/uploads/images/90/2d/902d0c48-095e-4919-81aa-4b8f4d3f198c.jpg');

  /* Full height */
  height: 100%; 
}

.secondSection {

  background-color: white;

  height: 100%;
}

.thirdSection {
  background-image: url('https://s.yimg.com/uu/api/res/1.2/.FBmPxSNQ1aKzAKunQHMZg--~B/aD0yMDI1O3c9MzQyNjtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/cc720def13cd7bb685733e6874d0abed');

  height: 100%;
  
}

.header-text-one {
  color: yellow;
  float: left;
}

.section-split {
  height:100px;
  background-color: hsl(120, 100%, 50%);
  /*background-color:red;*/
  font-size:36px;
}

h1, h3 {
  font-family: 'Catamaran', sans-serif;
}

</style>
