<template>
  <div>
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <!-- JuNK DO  NOT  USE -->
    <b-button
      v-if="showButton"
      @click="() => { on(); showButton = false;   }"
      variant="outline-info"
    >Add an association</b-button>

    <div id="overlay" style="padding-top:50px;">
      <add-association @getFormObject="getFormObject" />
      <hr />
      <button @click="() => {off();} ">exit</button>
    </div>
  </div>
</template>

<script>
import associationService from "@/services/association/AssociationService.js";
import AddAssociation from "@/components/admin/association/AddAssociation";
export default {
  components: { AddAssociation },
  data : function() {
      return {
          showButton: true
      }
  },
  methods: {
    getFormObject(value) {
      console.log("ajskdajksdkjasdkjaskdj");
    },
 

    async submitForm(value) {
      this.$emit('clicked', 'value')

      console.log("inside FORM RIGHT NOWWWWWWWWWW !!!!!!!!!!!!!!!!!");
      //this.response = await associationService.create(value);
    },
    createAssociation() {
      //associationService.create()
    },
    on() {

      document.getElementById("overlay").style.display = "block";
    },

    off() {
      document.getElementById("overlay").style.display = "none";
      this.showButton = true;
    }
  }
};
</script>

<style>
h1.white {
  color: white;
}
#overlay {
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