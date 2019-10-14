<template>
  <div>
    <h1>Create a match</h1>
    <h3>Start with picking the home-team</h3>
    <hr class="pretty" />

    <center>
      <b-input style="max-width:30%;" v-model="searchString" placeholder="search for a team" />
      <hr class="pretty" />

      <div v-for="team in filteredList">
        <div style="max-width:50%; padding:20px;">
          <b-card overlay img-src="https://picsum.photos/900/250/?image=3" img-alt="Card Image">
            <h1>
              <span>{{team}}</span>
            </h1>
            <!-- <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text> -->

            <b-button style="margin-top:20px;">SELECT</b-button>
          </b-card>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      teams: ["ronaldo", "dicapdro"],
      searchString : "",
      filteredList : teams
    };
  },

  filter() {
      this.filteredList = this.teams.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0;
  }
};
</script>

<style>
h1 {
  color: white;
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