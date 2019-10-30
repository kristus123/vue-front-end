<template>
  <div>
    <h1>Welcome to Pro-football</h1>
    <!-- <img src="https://i.imgur.com/pqdICWJ.mp4" alt=""> -->
    <!-- <iframe src="https://giphy.com/embed/BHNfhgU63qrks" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/BHNfhgU63qrks">via GIPHY</a></p> -->
    <img
      src="https://www.animatedimages.org/data/media/165/animated-football-and-soccer-image-0024.gif"
    />

    <hr style="margin-top:140px;" class="pretty" />
    <h2>Proud sponsors</h2>
    <hr class="pretty" />
    <div>
      <b-container>
        <b-row>
          <b-col>
            <b-img
              class="sponsor-image"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/1200px-UEFA_Champions_League_logo_2.svg.png"
              fluid
              alt="Fluid image"
            ></b-img>
          </b-col>
          <b-col>
            <b-img
              class="sponsor-image"
              src="https://www.trzcacak.rs/myfile/detail/68-686151_ea-sports-fifa-logo-png-logo-ea-sports.png"
              fluid
              alt="Fluid image"
            ></b-img>
          </b-col>
        </b-row>
      </b-container>
      <!-- <h2>haei</h2> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.welcome-txt {
  position: absolute;
  width: 75%;
  /* height : 10%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.centered {
  position: absolute;
  width: 75%;
  /* height : 50%; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sponsor-image {
  max-width: 50%;
}
</style>