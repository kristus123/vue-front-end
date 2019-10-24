<template>
  <div>

      <b-button v-if="showButton" @click="() => { on(); showButton = false;}" variant="outline-info">Add a new coach</b-button>

    <div id="overlay-coach" style="padding-top:50px;">
      <add-coach />
      <hr />
      <button @click="() => {off(); showButton = true;} ">exit</button>
    </div>
  </div>
</template>

<script>
// import associationService from "@/services/association/AssociationService.js";
import AddCoach from '@/components/admin/coach/AddCoach'
export default {
  components: { AddCoach },
  data : function() {
      return {
          showButton: true
      }
  },
  methods: {
    async submitForm(value) {
      console.log();
      //this.response = await associationService.create(value);
    },
    createAssociation() {
      //associationService.create()
    },
    on() {
      document.getElementById("overlay-coach").style.display = "block";
    },

    off() {
      document.getElementById("overlay-coach").style.display = "none";
    }
  }
};
</script>

<style>

#overlay-coach {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.842); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

#text {
  position: absolute;
  max-width: 100%;
  top: 50%;
  left: 50%;
  /* font-size: 50px; */
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>