<template>
  <div>
    <h1 style="margin-bottom:30px;">Match Info</h1>
     
    <b-container style="position:fixed; " v-if="matchInfo !== null">
      <b-row>
        <b-col>
          <h4 :class="{headerTransition: scrollPosition > 214}" >{{matchInfo.homeTeam.association.name}}</h4>

          <b-img v-if="homeTeamLogoUrl !== null"
            class="team-logo"
            v-bind:src="homeTeamLogoUrl"
            fluid
            alt="image"
          ></b-img>
          <!-- <img src="" alt="" srcset=""> -->
        </b-col>
        <b-col cols="6">
          <b-row>
            <b-col >
              <div :class="{scrollDownLeft: scrollPosition > transitionPosition, scrollUp: scrollPosition < 20}">
                <br>
                <br>
                <h1 class="score"> {{homeGoals}}</h1>
              </div>
              
            </b-col>
            <b-col>
              <br>
              <br>
              <h1 class="score" v-if="scrollPosition < transitionPosition"> -</h1>
              </b-col>
            <b-col>
              <div :class="{scrollDownRight: scrollPosition > transitionPosition, scrollUp: scrollPosition < 20}">
              <br>
              <br>
                <h1 class="score">{{awayGoals}} </h1>
              </div>
              </b-col>
            
          </b-row>
        </b-col>
        <b-col>
          <h4 :class="{headerTransition: scrollPosition > 214}" >{{matchInfo.awayTeam.association.name}}</h4>
          <b-img
            class="team-logo"
            v-bind:src="awayTeamLogoUrl"
            fluid
            alt="image"
          ></b-img>
        </b-col>
      </b-row>
    </b-container>
    <!-- <h1 class="text-left">hei</h1> -->
    <!-- <h1 class="text-right">hei</h1> -->
    <hr class="pretty" />
    <b-container style="margin-top: 260px;" class="parallax">
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <ul style="list-style-type:none">
            <li v-for="goals in match" :key="goals.goaldId">
              <goal-event :matchGoals="goals" />
            </li>
          </ul>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import matchGoalService from "@/services/matchGoal/MatchGoalService.js";
import matchService from "@/services/match/MatchService.js";
import GoalEvent from "@/components/user/match/GoalEvent";
import axios from 'axios'
export default {
  components: {
    GoalEvent, matchService, matchGoalService
  },
  async created() {
    this.match = await matchGoalService.getMatchGoalByMatchId(this.matchId);
    this.matchInfo = await matchService.getMatch(this.matchId);
    this.caluclateGoals();
    this.getLogo("home");
    this.getLogo("away");
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  
  name: "MatchEvent",

  data() {
    return {
      teamLeft: null,
      matchId: this.$route.params.matchId,
      matchGoal: "",
      match: [],
      homeTeamLogoUrl : null,
      awayTeamLogoUrl : null,
      matchInfo: "",
      homeGoals: 0,
      awayGoals: 0,
      scrollPosition: null,
      transitionPosition: 160
    };
  },
  methods: {
    caluclateGoals() {
      this.homeGoals = 0;
      this.awayGoals = 0;
      for(var i = 0; i < this.match.length; i++) {
        if(this.match[i].player.team.association.associationId === this.matchInfo.homeTeam.association.associationId) {
          this.homeGoals += 1;
        }
        else {
          this.awayGoals += 1;
        }
      }
    },
    async getLogo(home) {

      var teamName = home === "home" ? this.matchInfo.homeTeam.association.name : this.matchInfo.awayTeam.association.name;
      
      const resp = await axios
        .get('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + teamName)
        .then(resp => resp.data);
        
        if(home === "home") {
          this.homeTeamLogoUrl = resp.teams[0].strTeamBadge;
          console.log(this.homeTeamLogoUrl);
          }
        else {
          console.log(this.awayTeamLogoUrl);
          this.awayTeamLogoUrl = resp.teams[0].strTeamBadge;
        }
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
      console.log(this.scrollPosition);
    }

  }
};
</script>

<style>
.b-col-border {
  border-right: 2px dashed;
}

.parallax {
  /* The image used */
  background-image: url("https://i.pinimg.com/originals/79/76/39/797639828aa52b27402f15566736c0ee.jpg");

  /* Full height */
  height: 100%;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.team-logo {
  border-radius: 50px;
  max-width: 50%;
  /* border: 2px solid #73ad21; */
  /* padding: 20px; */
  /* width: 200px; */
  /* height: 200px; */
}

.floatleft {
  float: left;
  /* padding-right:200px; */
}
.floatright {
  float: right;
  /* margin-left:2000000px; */
}

.score {
  font-size: 70px;
}

.scrollDownLeft {
  text-align: left;
  float: left;
}

.scrollDownRight {
  text-align: right;
  float: right;
}

.scrollUp {
  text-align: center;
  float: center;
}

.headerTransition {
  color:white;
}
</style>
