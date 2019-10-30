<template>
    
    <div style="text-align:center;">
        <ul>
            
            <li v-for="result in results" v-bind:key="result.matchId">
              <router-link  v-bind:to="'user/match/' + result.matchId" style="text-decoration: none;">
                <div :class="result.result">
                    {{result.homeTeam}} - {{result.awayTeam}} ({{result.home}} - {{result.away}})
                </div>
              </router-link>
            </li>
            
        </ul>
    </div>
    
</template>

<script>
import MatchService from '@/services/match/MatchService.js';
export default {
    props: ['teamId'],
    name: 'RecentMatches',
    components: {
        MatchService,
    },

    async mounted() {
        var data = await MatchService.getMatchesByTeamId(this.teamId);

        this.results = data.data;
    },

    data() {
        return {
            results : []
        }
    },
    methods: {
      redirect: function (url, id) {
        window.location=url + "/" + id;
      }
    }
}



</script>

<style scoped>
div {
  width: 600px;
  margin:auto;
}
 
h2 {
  font: 400 40px/1.5 Helvetica, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}
 
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
 
li {
  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
}
 
li:last-child {
  border: none;
}
 
li div {
  text-decoration: none;
  color: #000;
  display: block;
  width: 600px;
 
  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}
 
li div:hover {
  font-size: 30px;
  background: #f6f6f6;
}

.win {
    background-color: green;
}

.lost {
    background-color: red;
}

.draw {
    background-color: grey;
}

</style>