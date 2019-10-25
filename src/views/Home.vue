<template>
  <div class="home" style="max-width:100%; overflow:hidden;">
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
          <b-button style="float:left;" >See our features</b-button>
          
        </b-col>
      </b-row>
    </div>

    <div class="section-split">
      
    </div>

    <div class="parallax secondSection">
      <div style="margin-bottom: 60px;">  <p style="visibility: hidden;"> dadsa </p> </div>
      
      <div class="features-box">Features</div>
       
      <h3 style="color:#FFDC00">The website app</h3>

      <p style="color:#FFDC00">View players, teams and more via your browser</p>
      

      <b-row style="margin-bottom: 30px;">
        <b-col></b-col>
        <b-col md="auto"> 
          <div image-overlay-data="Save your teams" class="black-overlay-img"></div>
          <img src="@/assets/loginCardExample.png" width="200" height="200" >
         </b-col>
        
        <b-col md="auto"> 
          <div image-overlay-data="Match details" class="black-overlay-img"></div>
          <img src="@/assets/matchEventExample.png" width="200" height="200" > </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="auto">
          <div image-overlay-data="Save stats" class="black-overlay-img"></div>
          <img src="@/assets/playerCardExample.png" width="200" height="200" > </b-col>
        <b-col md="auto"> 
          <div image-overlay-data="Team stats" class="black-overlay-img"></div>
          <img src="@/assets/teamCardExample.png" width="200" height="200" > </b-col>
        <b-col ></b-col>
      </b-row>
      <div style="margin-top: 60px;">  <p style="visibility: hidden;"> dadsa </p> </div>
    </div>
    

    <div class="section-split">
      
    </div>

    <div class="parallax thirdSection">
      <div style="margin-bottom: 300px;">  <p style="visibility: hidden;"> dadsa </p> </div>
      <div>
        <h1 class="header-text-two" style="font-size:100px;">Join us today!</h1>
      </div>
      <div style="margin-top: 300px;">  <p style="visibility: hidden;"> dadsa </p> </div>
    </div>

  </div>
  
</template>

<script>
import HomePageCards from "@/components/cards/HomePageCards";
import FlexibleForm from "@/components/forms/FlexibleForm";
// @ is an alias to /src
export default {
  async beforeMount() {
  },
  data: function() {
    return {
      
    };
  },
  methods: {
    moveToSection() {

    }
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
  
  background-image: url('  https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iDt6V.rPqgC0/v1/1000x-1.jpg');
  /*background-color : rgb(220, 220, 220);*/
  /*background-image: url("../assets/concrete-background.jpg");*/
  height: 100%;
}

.thirdSection {
  background-image: url('https://media.wired.com/photos/5aa0886c948df34b85e1004a/master/pass/turkish-football-fans.jpg');

  height: 100%;
}

.header-text-one {
  color: yellow;
  float: left;
}

.header-text-two {
  color: yellow;
}

.section-split {
  height:100px;
  /*background-color:red;*/
  font-size:36px;
}

h1, h3 {
  font-family: 'Catamaran', sans-serif;
}

p {
  font-family: 'Catamaran', sans-serif;
  color:black;
}

.row-space {
  margin-top:20px;
}

.features-box {
  background-color:black;
  color:white;
  width: 7%;
  margin: 0 auto;
  font-size:20px;
}

.black-overlay-img{
  position:absolute;
  text-align: center;
  vertical-align: middle;
  width: 200px;
  height:100%;
  background:rgba(0,0,0,0.3); 
}

.black-overlay-img:after {
    
    text-align: center;
    vertical-align: middle;
    content:attr(image-overlay-data);
    position:absolute;
    width:100%; height:100%;
    top:0; left:0;
    background:rgba(0,0,0,0.0);
    opacity:0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
}

.black-overlay-img:hover:after {
    opacity:1;
}

</style>
