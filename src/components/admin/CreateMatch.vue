<template>
  <div>
    <h1 style="color:black;">Create a match</h1>
    <hr class="pretty" />

    <center>
      <h3>Start with picking the home-team</h3>
      <b-input style="max-width:30%;" v-model="searchString" placeholder="search for a team" />
      <hr class="pretty" />

      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="8">
            <div v-for="team in teams">
              <div style="max-width:100%; padding:20px;">
                <b-card
                  overlay
                  img-src="https://picsum.photos/900/250/?image=3"
                  img-alt="Card Image"
                >
                  <h1>
                    <span>{{team}}</span>
                  </h1>
                  <!-- <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text> -->

                  <b-button style="margin-top:20px;">SELECT</b-button>
                </b-card>
              </div>
            </div>
          </b-col>

          <b-col>
            <strong>
              <b-card style="margin-top:20px;">
                <p>- Select home-team ✅</p>
                <p>- Select away-team ✅</p>
                
                <p>- Select season ❌</p>
                <p>- Select other thingss ? ❌</p>

              </b-card>
            </strong>
          </b-col>
        </b-row>
      </b-container>
    </center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: ["ronaldo", "dicapdro"],
      searchString: "",
      filteredList: this.teams
    };
  }
};
</script>

<style>
h1 {
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