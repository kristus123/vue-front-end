<template>
  <div>
    <div v-if="$store.state.userObject === null" style="float:right; padding-top:20px; padding-right:20px;">
      <router-link to="/signup">
        <b-button variant="outline-secondary" style="margin-right:20px;">Register now</b-button>
      </router-link>

      <router-link to="/login">
        <b-button variant="outline-primary">log in</b-button>
      </router-link>
    </div>

    <div v-else-if="$store.state.user.roles[0] === 'ADMINISTRATOR' ">
      <router-link to="/admin">
        <b-button variant="outline-primary">go to admin-area</b-button>
      </router-link>
    </div>

    <div v-else-if="$store.state.user.roles[0] === 'STANDARD' ">
      <router-link to="/user">
        <b-button variant="outline-primary">go to client-area</b-button>
      </router-link>
    </div>

    <br />

    <div class="home" style="max-width:100%; overflow:hidden;">
      <div>
        <h1 class="black">Welcome to ProFotball!</h1>
        <hr class="pretty" />
      </div>

      <div class="parallax firstSection">
        <br />
        <br />

        <center>
          <div class="transparent-grey">
            <br />
            <h1>Monoitor your favorite players and teams!</h1>
            <h3>Over 10 unique features</h3>
            <br />
          </div>
        </center>

        <br />
        <br />
      </div>

      <div class="section-split"></div>

      <div class="parallax secondSection">
        <center>
          <div class="transparent-grey">
            <div style="margin-bottom: 60px;">
              <p style="visibility: hidden;">dadsa</p>
            </div>

            <center>
              <h3 style="font-size:40px; color:white;">The website app</h3>
              <p style="font-size:20px; color:white;">some sick features. Even a login-form</p>
              <br />
              <br />
            </center>

            <b-row style="margin-bottom: 30px;">
              <b-col></b-col>
              <b-col md="auto">
                <div image-overlay-data="Save your teams" class="black-overlay-img"></div>
                <img src="@/assets/loginCardExample.png" width="200" height="200" />
              </b-col>

              <b-col md="auto">
                <div image-overlay-data="Match details" class="black-overlay-img"></div>
                <img src="@/assets/matchEventExample.png" width="200" height="200" />
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col md="auto">
                <div image-overlay-data="Save stats" class="black-overlay-img"></div>
                <img src="@/assets/playerCardExample.png" width="200" height="200" />
              </b-col>
              <b-col md="auto">
                <div image-overlay-data="Team stats" class="black-overlay-img"></div>
                <img src="@/assets/teamCardExample.png" width="200" height="200" />
              </b-col>
              <b-col></b-col>
            </b-row>
            <br />
            <br />
          </div>
        </center>
      </div>
      <div class="section-split"></div>
    </div>
  </div>
</template>

<script>
import HomePageCards from "@/components/cards/HomePageCards";
import FlexibleForm from "@/components/forms/FlexibleForm";
// @ is an alias to /src
export default {
  async beforeMount() {},
  data: function() {
    return {};
  },
  methods: {
    moveToSection() {}
  },
  name: "home",
  components: { HomePageCards, FlexibleForm }
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Catamaran:700&display=swap'); */

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
  padding-top: 70px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
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
  background-image: url("https://ugc.futurelearn.com/uploads/images/90/2d/902d0c48-095e-4919-81aa-4b8f4d3f198c.jpg");

  /* Full height */
  max-height: 100%;
}

.secondSection {
  background-image: url("  https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iDt6V.rPqgC0/v1/1000x-1.jpg");
  /*background-color : rgb(220, 220, 220);*/
  /*background-image: url("../assets/concrete-background.jpg");*/
  height: 100%;
}

.thirdSection {
  background-image: url("https://media.wired.com/photos/5aa0886c948df34b85e1004a/master/pass/turkish-football-fans.jpg");

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
  height: 100px;
  /*background-color:red;*/
  font-size: 36px;
}

h1,
h3 {
  font-family: "Catamaran", sans-serif;
}

p {
  font-family: "Catamaran", sans-serif;
  color: black;
}

.row-space {
  margin-top: 20px;
}

.features-box {
  background-color: black;
  color: white;
  width: 7%;
  margin: 0 auto;
  font-size: 20px;
}

h3 {
  color: white;
}

.black-overlay-img {
  position: absolute;
  text-align: center;
  vertical-align: middle;
  width: 200px;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.black-overlay-img:after {
  text-align: center;
  vertical-align: middle;
  content: attr(image-overlay-data);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

h1 {
  color: white;
}

h1.black {
  color: black;
}

.transparent-grey {
  max-width: 90%;
  background: rgba(0, 0, 0, 0.671);
}

.black-overlay-img:hover:after {
  opacity: 1;
}
</style>
