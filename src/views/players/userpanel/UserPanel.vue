<template>
  <div>
    <center>
      <div class="topnav">
        <router-link to="/UserPanel/AddTeam">Add team</router-link>

        <router-link to="/UserPanel/createPerson">Create Person</router-link>
        

        <router-link to="/UserPanel/createMatch">Create a match</router-link>
        
        
      </div>
    

    </center>
    <router-view  style="margin-top:10px;" />

  </div>
</template>

<script>
export default {};
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  margin-top: 0px;
  max-width: 100%;
  background-color: #17a2b8;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  color: #f2f2f2;
  text-align: center;
  padding: 14px 50px;
  text-decoration: none;
  font-size: 20px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
}
</style>